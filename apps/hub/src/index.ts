import http from "http";
const port = 8081;
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
server.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
