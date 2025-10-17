import express from 'express'

import { userLogin, userRegister } from '../controllers/authController'

import { registerSchema } from '../validation/auth.validation'

import { validateBody } from '../middlewares/body.validator.middleware'

const router = express.Router();

router.route("/register").post(validateBody(registerSchema), userRegister);

router.route("/login").post(userLogin);


export default router;