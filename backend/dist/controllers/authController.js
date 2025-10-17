"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const userService_1 = require("../services/userService");
const apiError_1 = require("../utils/apiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../entity/user");
const token_1 = require("../utils/token");
const userRegister = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const userExisting = await (0, userService_1.getUserByEmail)(email);
        if (userExisting) {
            throw new apiError_1.ApiError("Email already in use", 401);
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = user_1.User.create({ firstName, lastName, email, password: hashedPassword, role });
        await user.save();
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userRegister = userRegister;
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, userService_1.getUserByEmail)(email);
        if (!user) {
            throw new apiError_1.ApiError("User not found", 404);
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new apiError_1.ApiError("Invalid Credentials", 401);
        }
        const payload = {
            userId: user.id,
            role: user.role
        };
        const accessToken = await (0, token_1.generateToken)(payload);
        res.status(200).json({
            sucesss: true,
            message: "logged in successfully",
            user,
            accessToken
        });
    }
    catch (error) {
        next(error);
    }
};
exports.userLogin = userLogin;
