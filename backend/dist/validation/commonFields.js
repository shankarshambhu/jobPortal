"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.lastName = exports.firstName = exports.password = exports.email = void 0;
const joi_1 = __importDefault(require("joi"));
const user_1 = require("../entity/user");
// Email validation
exports.email = joi_1.default.string()
    .email({ tlds: { allow: true } }) // ensures proper email format
    .required()
    .messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
});
// Password validation
exports.password = joi_1.default.string()
    .min(6)
    .pattern(/\d/) // must contain at least 1 number
    .required()
    .messages({
    "string.min": "Password must be at least 6 characters",
    "string.pattern.base": "Password must contain at least one number",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
});
// Name fields
exports.firstName = joi_1.default.string().min(2).required().messages({
    "string.min": "First name must be at least 2 characters",
    "string.empty": "First name cannot be empty",
    "any.required": "First name is required",
});
exports.lastName = joi_1.default.string().min(2).required().messages({
    "string.min": "Last name must be at least 2 characters",
    "string.empty": "Last name cannot be empty",
    "any.required": "Last name is required",
});
// Role
exports.role = joi_1.default.string()
    .valid(...Object.values(user_1.Role))
    .required()
    .messages({
    "any.only": `Role must be one of [${Object.values(user_1.Role).join(", ")}]`,
    "any.required": "Role is required",
});
