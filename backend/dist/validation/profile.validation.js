"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyProfileSchema = exports.candidateProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const candidateProfile_1 = require("../entity/candidateProfile");
exports.candidateProfileSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).messages({
        "string.min": "First name must be at least 2 characters",
        "string.empty": "First name cannot be empty",
    }),
    lastName: joi_1.default.string().min(2).messages({
        "string.min": "Last name must be at least 2 characters",
        "string.empty": "Last name cannot be empty",
    }),
    age: joi_1.default.number()
        .min(18)
        .required()
        .messages({
        "number.base": "Age must be a number",
        "number.min": "Age must be at least 18",
        "any.required": "Age is required",
    }),
    address: joi_1.default.string().min(5).required().messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters",
        "any.required": "Address is required",
    }),
    phone_number: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.pattern.base": "Phone number must be 10 digits",
        "any.required": "Phone number is required",
    }),
    date_of_birth: joi_1.default.date().required().messages({
        "date.base": "Date of birth must be a valid date",
        "any.required": "Date of birth is required",
    }),
    gender: joi_1.default.string()
        .valid(...Object.values(candidateProfile_1.Gender))
        .required()
        .messages({
        "any.only": `Gender must be one of [${Object.values(candidateProfile_1.Gender).join(", ")}]`,
        "any.required": "Gender is required",
    }),
    experienceYears: joi_1.default.number()
        .min(0)
        .required()
        .messages({
        "number.base": "Experience years must be a number",
        "number.min": "Experience years cannot be negative",
        "any.required": "Experience years is required",
    }),
    skills: joi_1.default.array().items(joi_1.default.string()), // optional array of strings
    resume: joi_1.default.string().optional(),
});
exports.companyProfileSchema = joi_1.default.object({
    companyName: joi_1.default.string().min(2).required().messages({
        "string.base": "Company name must be a string",
        "string.min": "Company name must be at least 2 characters",
        "any.required": "Company name is required",
    }),
    website: joi_1.default.string()
        .uri()
        .required()
        .messages({
        "string.uri": "Website must be a valid URL",
        "any.required": "Website is required",
    }),
    address: joi_1.default.string().min(5).required().messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters",
        "any.required": "Address is required",
    }),
    logourl: joi_1.default.string()
        .uri()
        .required()
        .messages({
        "string.uri": "Logo URL must be a valid URL",
        "any.required": "Logo URL is required",
    }),
});
