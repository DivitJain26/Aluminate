import ms from "ms";
import { getEnv } from "./env.js";

// Common cookie options
const baseCookieOptions = {
    httpOnly: true,
    secure: (getEnv('NODE_ENV') === 'production'),
    sameSite: getEnv('ACCESS_AND_REFRESH_TOKEN_COOKIE_SAME_SITE'),
}

// Set cookies
export const setTokenCookies = (res, accessToken, refreshToken) => {
    // Set access token in cookie
    res.cookie('accessToken', accessToken, {
        ...baseCookieOptions,
        maxAge: ms(getEnv('JWT_ACCESS_TOKEN_AND_COOKIE_EXPIRES_IN')),
        path: '/'
    });

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
        ...baseCookieOptions,
        maxAge: ms(getEnv('JWT_REFRESH_TOKEN_AND_COOKIE_EXPIRES_IN')),
        path: '/api/auth/refresh', // Only sent to refresh endpoint
    });
};