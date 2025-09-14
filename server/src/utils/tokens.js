import jwt from "jsonwebtoken";

// Generate tokens
export const generateTokens = (userId) => {

    if (!userId) {
        throw new Error("User ID is required to generate tokens");
    }

    // Access token
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_AND_COOKIE_EXPIRES_IN }
    )

    // Refresh token
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_AND_COOKIE_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
}