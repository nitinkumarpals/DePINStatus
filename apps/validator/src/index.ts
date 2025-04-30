 import "dotenv/config";
import WebSocket, { Server as WebSocketServer } from "ws";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import * as naclUtil from "tweetnacl-util";
import { randomUUID } from "crypto";
import type {
  OutgoingMessage,
  SignupOutgoingMessage,
  ValidateOutgoingMessage,
} from "common/types";

// Map to handle callbacks
const CALLBACKS: {
  [callbackId: string]: (data: SignupOutgoingMessage) => void;
} = {};

let validatorId: string | null = null;

async function main() {
  try {
    let keypair: Keypair;

    // Try to use existing secret key
    if (process.env.PRIVATE_KEY) {
      try {
        let privateKeyArray: number[];
        try {
          privateKeyArray = JSON.parse(process.env.PRIVATE_KEY);
        } catch (parseError) {
          console.error("Error parsing PRIVATE_KEY:", parseError);
          throw new Error("Invalid PRIVATE_KEY format. Must be a JSON-parseable array of numbers.");
        }

        if (!Array.isArray(privateKeyArray) || privateKeyArray.length !== 64) {
          throw new Error(`Invalid secret key length. Expected 64 bytes, got ${privateKeyArray?.length}`);
        }

        const secretKeyUint8Array = Uint8Array.from(privateKeyArray);
        
        console.log("Attempting to create keypair from existing secret key");
        console.log("Secret Key Length:", secretKeyUint8Array.length);
        console.log("Secret Key First 10 Bytes:", secretKeyUint8Array.slice(0, 10));

        keypair = Keypair.fromSecretKey(secretKeyUint8Array);
        console.log("Existing Validator Public Key:", keypair.publicKey.toBase58());
      } catch (keyError) {
        console.warn("Failed to use existing secret key. Generating new keypair.", keyError);
        keypair = Keypair.generate();
      }
    } else {
      // No secret key in .env, generate a new one
      console.log("No existing secret key found. Generating new keypair.");
      keypair = Keypair.generate();
    }

    // Save the new secret key to .env file if generation was needed
    const newSecretKeyArray = Array.from(keypair.secretKey);
    console.log("New Validator Public Key:", keypair.publicKey.toBase58());
    console.log("New Secret Key (for .env):", JSON.stringify(newSecretKeyArray));

    const ws = new WebSocket("ws://localhost:8081");

    ws.on("message", async (data: string | Buffer) => {
      try {
        // Convert Buffer to string if needed
        const messageData = Buffer.isBuffer(data) ? data.toString('utf8') : data;

        // Check if data is a valid JSON string
        if (!messageData || typeof messageData !== 'string') {
          console.warn('Received invalid message:', messageData);
          return;
        }

        // Ignore connection-related messages
        if (messageData.includes('connection')) {
          console.log('Received connection-related message:', messageData);
          return;
        }

        let message: OutgoingMessage;
        try {
          message = JSON.parse(messageData);
        } catch (parseError) {
          console.error('Failed to parse WebSocket message:', parseError);
          console.error('Raw message:', messageData);
          return;
        }

        // Validate message structure
        if (!message || !message.type) {
          console.warn('Received message with invalid structure:', message);
          return;
        }

        switch (message.type) {
          case "signup":
            CALLBACKS[message.data.callbackId]?.(message.data);
            delete CALLBACKS[message.data.callbackId];
            break;
          case "validate":
            await validateHandler(ws, message.data, keypair);
            break;
          default:
            console.warn('Received message with unknown type:', message.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on("open", async () => {
      const callbackId = randomUUID();
      CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
        validatorId = data.validatorId;
      };
      const signedMessage = await signMessage(
        `Signed message for ${callbackId}, ${keypair.publicKey}`,
        keypair
      );

      ws.send(
        JSON.stringify({
          type: "signup",
          data: {
            callbackId,
            ip: "127.0.0.1",
            publicKey: keypair.publicKey.toBase58(),
            signedMessage,
          },
        })
      );
    });
  } catch (error) {
    console.error("Initialization Error:", error);
    process.exit(1);
  }
}

async function validateHandler(
  ws: WebSocket,
  { url, callbackId, websiteId }: ValidateOutgoingMessage,
  keypair: Keypair
) {
  console.log(`Validating ${url}`);
  const startTime = Date.now();
  const signature = await signMessage(`Replying to ${callbackId}`, keypair);

  try {
    const response = await fetch(url);
    const endTime = Date.now();
    const latency = endTime - startTime;
    const status = response.status;

    ws.send(
      JSON.stringify({
        type: "validate",
        data: {
          callbackId,
          status: status === 200 ? "Good" : "Bad",
          latency,
          websiteId,
          validatorId,
          signedMessage: signature,
        },
      })
    );
  } catch (error) {
    ws.send(
      JSON.stringify({
        type: "validate",
        data: {
          callbackId,
          status: "Bad",
          latency: 1000,
          websiteId,
          validatorId,
          signedMessage: signature,
        },
      })
    );
    console.error(error);
  }
}

async function signMessage(message: string, keypair: Keypair) {
  const messageBytes = naclUtil.decodeUTF8(message);
  const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
  return JSON.stringify(Array.from(signature));
}

main();

// Optional polling interval (empty as per original)
setInterval(() => {}, 10000);
