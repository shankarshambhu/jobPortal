import Joi from "joi";
import { email, password, firstName, lastName, role } from "./commonFields";

export const registerSchema = Joi.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
});

// export const loginSchema = Joi.object({
//     email: email,
//     // password: password,
// });
