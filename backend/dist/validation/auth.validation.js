"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commonFields_1 = require("./commonFields");
exports.registerSchema = joi_1.default.object({
    firstName: commonFields_1.firstName,
    lastName: commonFields_1.lastName,
    email: commonFields_1.email,
    password: commonFields_1.password,
    role: commonFields_1.role,
});
// export const loginSchema = Joi.object({
//     email: email,
//     // password: password,
// });
