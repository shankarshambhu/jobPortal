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
    age: Joi.number().min(18).required(),
    address: Joi.string().min(5).required(),
    phone_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
    date_of_birth: Joi.date().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required(),
    experienceYears: Joi.number().min(0).required(),
    skills: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ),
    resume: Joi.any()
}).unknown(true); // ✅ allow extra fields like id, email, role


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
