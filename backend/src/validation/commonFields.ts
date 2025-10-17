import Joi from "joi";
import { Role } from "../entity/user";

// Email validation
export const email = Joi.string()
    .email({ tlds: { allow: true } }) // ensures proper email format
    .required()
    .messages({
        "string.email": "Please enter a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
    });

// Password validation
export const password = Joi.string()
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
export const firstName = Joi.string().min(2).required().messages({
    "string.min": "First name must be at least 2 characters",
    "string.empty": "First name cannot be empty",
    "any.required": "First name is required",
});

export const lastName = Joi.string().min(2).required().messages({
    "string.min": "Last name must be at least 2 characters",
    "string.empty": "Last name cannot be empty",
    "any.required": "Last name is required",
});

// Role
export const role = Joi.string()
    .valid(...Object.values(Role))
    .required()
    .messages({
        "any.only": `Role must be one of [${Object.values(Role).join(", ")}]`,
        "any.required": "Role is required",
    });
