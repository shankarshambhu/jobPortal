import { WebSocketServer, WebSocket } from "ws";
import { Server as HttpServer } from "http";

export const setupSignalingServer = (server: HttpServer) => {
    const wss = new WebSocketServer({ noServer: true });
    const rooms: Record<string, Set<WebSocket>> = {};

    server.on("upgrade", (request, socket, head) => {
        console.log("hello reached")
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    });

    wss.on("connection", (ws: WebSocket, req) => {
        console.log("hello connected")
        const roomId = req.url?.split("/").pop();
        if (!roomId) return;

        if (!rooms[roomId]) rooms[roomId] = new Set();  
        rooms[roomId].add(ws);
        console.log(`User joined room ${roomId}. Total: ${rooms[roomId].size}`);

        ws.on("message", (msg) => {
            // Broadcast messages to all other peers in the room
            const messageStr = msg.toString('utf8');
            rooms[roomId].forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(messageStr); // Send as string, not Buffer
                }
            });
        });

        ws.on("close", () => {
            rooms[roomId].delete(ws);
            console.log(`User left room ${roomId}. Remaining: ${rooms[roomId].size}`);
            if (rooms[roomId].size === 0) delete rooms[roomId];
        });
    });
};
