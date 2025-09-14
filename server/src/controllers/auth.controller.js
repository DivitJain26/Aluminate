import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/tokens.js";
import { setTokenCookies } from "../utils/cookies.js";

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            email,
            password,
            fullName,
            collegeName,
            course,
            abcId,
            enrollment,
            specialization,
            yearOfJoining,
            yearOfPassing
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).json({
                success: false,
                message: 'User already exists',
                data: null
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(403).json({ error: 'Password must be at least 6 characters long' });
        }

        // create new user
        const newUser = await User.create({
            name,
            email,
            password,
            fullName,
            collegeName,
            course,
            abcId,
            enrollment,
            specialization,
            yearOfJoining,
            yearOfPassing
        });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(newUser._id);

        // Save refresh token to user
        newUser.refreshToken = refreshToken;
        newUser.save();

        // Set cookies
        setTokenCookies(res, accessToken, refreshToken);

        const userData = newUser.getPublicProfile();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userData
            }
        });

    } catch (error) {
        console.log(`Regestration Error ${error}`);
        res.status(500).json({
            success: false,
            message: `Regestration Error: ${error}`,
            data: null
        });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password')

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                data: null
            });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                data: null
            });
        }

        // Update last login
        user.lastLoginAt = new Date();
        await user.save();

        // Generate token
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Save refresh token to user
        user.refreshToken = refreshToken;
        await user.save();

        // Set cookies
        setTokenCookies(res, accessToken, refreshToken);

        // Return user data without password
        const userData = user.getPublicProfile();

        const { _id, name, email: userEmail, role } = user;
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: userData
            }
        });

    } catch (error) {
        console.log(`Login Error: ${error}`);
        res.status(400).json({
            success: false,
            message: 'Login failed',
            data: null
        });
    }
}

// Refresh token
export const refreshToken = async (req, res, next) => {
    try {
        // Get refresh token from cookies
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ 
                success: false,
                message: 'Refresh token not found', 
                data: null
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

        // Find user with matching refresh token
        const user = await User.findById(decoded.id).select('+refreshToken');;

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid refresh token',
                data: null
            });
        }

        // Generate new tokens
        const tokens = generateTokens(user._id);

        // Update refresh token in database
        user.refreshToken = tokens.refreshToken;
        await user.save();

        // Set new cookies
        setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: null
        });

    } catch (error) {
        console.log(`Refresh Token Error ${error}`);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: `Refresh Token Error: ${error}`,
                data: null
            });
        }
    }
}

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (refreshToken) {
            // Find user with this refresh token and clear it
            await User.findOneAndUpdate(
                { refreshToken },
                { $set: { refreshToken: '' } }
            );
        }

        const baseCookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.ACCESS_AND_REFRESH_TOKEN_COOKIE_SAME_SITE,
            maxAge: 0, // Set maxAge to 0 to delete the cookie
        }


        // Clear cookies
        res.clearCookie('accessToken', {
            ...baseCookieOptions,
            path: '/', // Accessible across the entire site
        });

        res.clearCookie('refreshToken', {
            ...baseCookieOptions,
            path: '/api/auth/refresh',
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
            data: null
        });

    } catch (error) {
        console.log(`Logout Error ${error}`);
        res.status(400).json({
            success: false,
            message: `Logout Error: ${error}`,
            data: null
        });
    }
}

// Get current user
export const getCurrentUser = async (req, res, next) => {
    try {

        if (!req.user?.id) {
            res.status(401).json({ 
                success: false,
                message: 'Unauthorized - User not authenticated',
                data: null
            });
            return;
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found',
                data: null
            });
        }

        const userData = user.getPublicProfile();
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: {
                user: userData
            }
        });
    } catch (error) {
        console.log(`Get user Error ${error}`);
        res.status(400).json({
            success: false,
            message: `Get user Error ${error}`,
            data: null
        });
    }
};

// auth.controller.js
export const updateProfile = async (req, res) => {
  try {
    const { email, ...updates } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required to update profile" });
    }

    const user = await User.findOneAndUpdate(
      { email },      // find user by email
      { $set: updates },  // apply updates
      { new: true }   // return updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};
