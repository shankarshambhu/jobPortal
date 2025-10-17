import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ApiError } from './apiError';
dotenv.config();
const secretKey = process.env.JWT_SECRET!;


export const generateToken = async (payload: Object) => {
    try {

        return jwt.sign(payload, secretKey, { expiresIn: '2d' })

    } catch (error) {

    }

}

export const verifyAccessToken = async (token: string) => {
    try {
        return jwt.verify(token, secretKey);

    } catch (error) {
        throw new ApiError("Invalid or expired access token", 401)



    }
}