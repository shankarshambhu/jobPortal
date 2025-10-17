import Joi from "joi";
import { Gender } from "../entity/candidateProfile";

export const candidateProfileSchema = Joi.object({
    firstName: Joi.string().min(2).messages({
        "string.min": "First name must be at least 2 characters",
        "string.empty": "First name cannot be empty",
    }),
    lastName: Joi.string().min(2).messages({
        "string.min": "Last name must be at least 2 characters",
        "string.empty": "Last name cannot be empty",
    }),
    age: Joi.number()
        .min(18)
        .required()
        .messages({
            "number.base": "Age must be a number",
            "number.min": "Age must be at least 18",
            "any.required": "Age is required",
        }),

    address: Joi.string().min(5).required().messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters",
        "any.required": "Address is required",
    }),

    phone_number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be 10 digits",
            "any.required": "Phone number is required",
        }),

    date_of_birth: Joi.date().required().messages({
        "date.base": "Date of birth must be a valid date",
        "any.required": "Date of birth is required",
    }),

    gender: Joi.string()
        .valid(...Object.values(Gender))
        .required()
        .messages({
            "any.only": `Gender must be one of [${Object.values(Gender).join(", ")}]`,
            "any.required": "Gender is required",
        }),

    experienceYears: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Experience years must be a number",
            "number.min": "Experience years cannot be negative",
            "any.required": "Experience years is required",
        }),

    skills: Joi.array().items(Joi.string()), // optional array of strings

    resume: Joi.string().optional(),
});




export const companyProfileSchema = Joi.object({
    companyName: Joi.string().min(2).required().messages({
        "string.base": "Company name must be a string",
        "string.min": "Company name must be at least 2 characters",
        "any.required": "Company name is required",
    }),
    website: Joi.string()
        .uri()
        .required()
        .messages({
            "string.uri": "Website must be a valid URL",
            "any.required": "Website is required",
        }),
    address: Joi.string().min(5).required().messages({
        "string.base": "Address must be a string",
        "string.min": "Address must be at least 5 characters",
        "any.required": "Address is required",
    }),
    logourl: Joi.string()
        .uri()
        .required()
        .messages({
            "string.uri": "Logo URL must be a valid URL",
            "any.required": "Logo URL is required",
        }),
});
