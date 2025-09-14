import ms from "ms";

// Common cookie options
const baseCookieOptions = {
    httpOnly: true,
    secure: (process.env.NODE_ENV === 'production'),
    sameSite: process.env.ACCESS_AND_REFRESH_TOKEN_COOKIE_SAME_SITE,
}

// Set cookies
export const setTokenCookies = (res, accessToken, refreshToken) => {
    // Set access token in cookie
    res.cookie('accessToken', accessToken, {
        ...baseCookieOptions,
        maxAge: ms(process.env.JWT_ACCESS_TOKEN_AND_COOKIE_EXPIRES_IN),
        path: '/'
    });

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
        ...baseCookieOptions,
        maxAge: ms(process.env.JWT_REFRESH_TOKEN_AND_COOKIE_EXPIRES_IN),
        path: '/api/auth/refresh', // Only sent to refresh endpoint
    });
};