import jwt from "jsonwebtoken";
import { getEnv } from '../utils/env.js';

// Generate tokens
export const generateTokens = (userId) => {

    if (!userId) {
        throw new Error("User ID is required to generate tokens");
    }

    // Access token
    const accessToken = jwt.sign(
        { id: userId },
        getEnv('JWT_ACCESS_TOKEN_SECRET'),
        { expiresIn: getEnv('JWT_ACCESS_TOKEN_AND_COOKIE_EXPIRES_IN') }
    )

    // Refresh token
    const refreshToken = jwt.sign(
        { id: userId },
        getEnv('JWT_REFRESH_TOKEN_SECRET'),
        { expiresIn: getEnv('JWT_REFRESH_TOKEN_AND_COOKIE_EXPIRES_IN') }
    );

    return { accessToken, refreshToken };
}