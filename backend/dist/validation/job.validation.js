"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobCreationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const job_1 = require("../entity/job");
exports.jobCreationSchema = joi_1.default.object({
    title: joi_1.default.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
        "string.empty": "Job title is required",
        "string.min": "Job title must be at least 3 characters",
        "string.max": "Job title cannot exceed 100 characters",
    }),
    description: joi_1.default.string()
        .trim()
        .min(10)
        .max(5000)
        .required()
        .messages({
        "string.empty": "Job description is required",
        "string.min": "Job description must be at least 10 characters",
        "string.max": "Job description cannot exceed 5000 characters",
    }),
    location: joi_1.default.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
        "string.empty": "Location is required",
        "string.min": "Location must be at least 2 characters",
        "string.max": "Location cannot exceed 100 characters",
    }),
    salary: joi_1.default.number()
        .min(0)
        .precision(2) // allows up to 2 decimal places
        .required()
        .messages({
        "number.base": "Salary must be a number",
        "number.min": "Salary cannot be negative",
        "any.required": "Salary is required",
    }),
    jobtype: joi_1.default.string()
        .valid(job_1.JobType.FULL_TIME, job_1.JobType.PART_TIME, job_1.JobType.INTERNSHIP)
        .required()
        .messages({
        "any.only": `Job type must be one of ${Object.values(job_1.JobType).join(", ")}`,
        "any.required": "Job type is required",
    }),
    enddate: joi_1.default.date()
        .greater('now')
        .required()
        .messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date must be in the future",
        "any.required": "End date is required",
    }),
    skills: joi_1.default.array()
        .items(joi_1.default.string().trim().min(2).max(50))
        .min(1)
        .required()
        .messages({
        "array.base": "Skills must be an array",
        "array.min": "At least one skill is required",
        "string.min": "Each skill must be at least 2 characters",
        "string.max": "Skill name cannot exceed 50 characters",
        "any.required": "Skills are required",
    }),
});
