"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiError_1 = require("./apiError");
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
const generateToken = async (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1d' });
    }
    catch (error) {
    }
};
exports.generateToken = generateToken;
const verifyAccessToken = async (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        throw new apiError_1.ApiError("Invalid or expired access token", 401);
    }
};
exports.verifyAccessToken = verifyAccessToken;
