import { getUserByEmail } from '../services/userService';
import { ApiError } from '../utils/apiError';
import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { User } from '../entity/user';
import { generateToken } from '../utils/token';

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const userExisting = await getUserByEmail(email)
        if (userExisting) {
            throw new ApiError("Email already in use", 401)
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = User.create({ firstName, lastName, email, password: hashedPassword, role });
        await user.save();
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        next(error)
    }

}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError("Invalid Credentials", 401);
        }
        const payload = {
            userId: user.id,
            role: user.role
        }
        const accessToken = await generateToken(payload);


        res.status(200).json({
            sucesss: true,
            message: "logged in successfully",
            user,
            accessToken
        })



    } catch (error) {
        next(error)

    }

}

