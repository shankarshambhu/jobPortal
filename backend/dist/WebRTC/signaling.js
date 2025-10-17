"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSignalingServer = void 0;
const ws_1 = require("ws");
const setupSignalingServer = (server) => {
    const wss = new ws_1.WebSocketServer({ noServer: true });
    const rooms = {};
    server.on("upgrade", (request, socket, head) => {
        console.log("hello reached");
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    });
    wss.on("connection", (ws, req) => {
        console.log("hello connected");
        const roomId = req.url?.split("/").pop();
        if (!roomId)
            return;
        if (!rooms[roomId])
            rooms[roomId] = new Set();
        rooms[roomId].add(ws);
        console.log(`User joined room ${roomId}. Total: ${rooms[roomId].size}`);
        ws.on("message", (msg) => {
            // Broadcast messages to all other peers in the room
            const messageStr = msg.toString('utf8');
            rooms[roomId].forEach((client) => {
                if (client !== ws && client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(messageStr); // Send as string, not Buffer
                }
            });
        });
        ws.on("close", () => {
            rooms[roomId].delete(ws);
            console.log(`User left room ${roomId}. Remaining: ${rooms[roomId].size}`);
            if (rooms[roomId].size === 0)
                delete rooms[roomId];
        });
    });
};
exports.setupSignalingServer = setupSignalingServer;
