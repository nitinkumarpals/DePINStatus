import http from "http";
import WebSocket, { Server as WebSocketServer } from "ws";
import { prisma } from "db/client";
import { randomUUID } from "crypto";
import { PublicKey } from "@solana/web3.js";
import nacl, { verify } from "tweetnacl";
import naclUtil from "tweetnacl-util";
import geoip from "geoip-lite";
import {
  IncomingMessage,
  OutgoingMessage,
  SignupIncomingMessage,
} from "common/types";
const port = 8081;
const COST_PER_VALIDATION = 100; // in lamports

const CALLBACKS: { [callbackId: string]: (data: IncomingMessage) => void } = {};

const availableValidators: {
  validatorId: string;
  socket: WebSocket;
  publicKey: string;
}[] = [];

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", message: "healthy server" }));
    return;
  }
  if (req.url === "/favicon.ico") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }
  res.writeHead(426, { "content-type": "text/plain" });
  res.end("Please connect via WebSocket.\n");
});

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("message", async (message) => {
    const data: IncomingMessage = JSON.parse(message.toString());
    if (data.type === "signup") {
      const verified = await verifyMessage(
        `Signed message for ${data.data.callbackId} ${data.data.publicKey}`,
        data.data.publicKey,
        data.data.signedMessage
      );
      if (verified) {
        await signUpHandler(ws, data.data);
      }
    } else if (data.type === "validate") {
      CALLBACKS[data.data.callbackId]?.(data);
      delete CALLBACKS[data.data.callbackId];
    }
  });

  ws.on("close", () => {
    const idx = availableValidators.findIndex((v) => v.socket === ws);
    if (idx !== -1) availableValidators.splice(idx, 1);
    console.log("Client disconnected!");
  });
});
async function signUpHandler(
  ws: WebSocket,
  { ip, publicKey, callbackId }: SignupIncomingMessage
) {
  try {
    const validatorDb = await prisma.validator.findFirst({
      where: { publicKey },
    });
    if (validatorDb) {
      ws.send(
        JSON.stringify({
          type: "signup",
          data: {
            validatorId: validatorDb.id,
            callbackId,
          },
        })
      );
      availableValidators.push({
        validatorId: validatorDb.id,
        socket: ws,
        publicKey: validatorDb.publicKey,
      });
      return;
    }
    const geo = geoip.lookup(ip);

    const location = geo
      ? `${geo.city ?? "Unknown"}, ${geo.region ?? "Unknown"}, ${geo.country ?? "Unknown"}`
      : "Unknown";

    const validator = await prisma.validator.create({
      data: {
        ip,
        publicKey,
        location,
      },
    });

    ws.send(
      JSON.stringify({
        type: "signup",
        data: {
          validatorId: validator.id,
          callbackId,
        },
      })
    );
    availableValidators.push({
      validatorId: validator.id,
      socket: ws,
      publicKey: validator.publicKey,
    });
  } catch (error) {
    console.error("Error in signUpHandler:", error);
    ws.send(
      JSON.stringify({
        type: "error",
        data: {
          message: "An error occurred during signup",
        },
      })
    );
  }
}
async function verifyMessage(
  message: string,
  publicKey: string,
  signature: string
) {
  const messageBytes = naclUtil.decodeUTF8(message);
  const result = nacl.sign.detached.verify(
    messageBytes,
    new Uint8Array(JSON.parse(signature)),
    new PublicKey(publicKey).toBytes()
  );
  return result;
}

setInterval(async () => {
  try {
    const websitesToMonitor = await prisma.website.findMany({
      where: {
        disabled: false,
      },
    });
    for (const website of websitesToMonitor) {
      availableValidators.forEach((validator) => {
        const callbackId = randomUUID();
        console.log(
          `Sending validate to ${validator.validatorId} ${website.url}`
        );
        validator.socket.send(
          JSON.stringify({
            type: "validate",
            data: {
              url: website.url,
              callbackId,
            },
          })
        );
        CALLBACKS[callbackId] = async (data: IncomingMessage) => {
          if (data.type === "validate") {
            const { validatorId, status, latency, signedMessage } = data.data;
            const verified = await verifyMessage(
              `Replying to ${callbackId}`,
              validator.publicKey,
              signedMessage
            );
            if (!verified) return;
            await prisma.$transaction(async (tx) => {
              await tx.websiteTick.create({
                data: {
                  websiteId: website.id,
                  validatorId,
                  status,
                  latency,
                  createdAt: new Date(),
                },
              }),
                await tx.validator.update({
                  where: { id: validatorId },
                  data: {
                    pendingPayouts: { increment: COST_PER_VALIDATION },
                  },
                });
            });
          }
        };
      });
    }
  } catch (error) {
    console.error("Error in validateHandler:", error);
    return;
  }
}, 60 * 1000);

server.listen(port, () => {
  console.log(`WebSocket server running on ws://localhost:${port}`);
});
