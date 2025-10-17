"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDb_1 = require("./database/connectDb");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const signaling_1 = require("./WebRTC/signaling");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = (0, http_1.createServer)(app_1.default);
(0, signaling_1.setupSignalingServer)(server);
server.listen(PORT, () => {
    (0, connectDb_1.Connection)();
    console.log(`Server running at http://localhost:${PORT}`);
});
