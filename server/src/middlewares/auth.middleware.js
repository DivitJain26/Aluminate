import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticateToken = async (req, res, next) => {
    try {

        // Get token from cookie
        const token = req.cookies.accessToken;

        // Check if token exists
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

            // console.log('req.user:', req.user);

            // Get user role
            const user = await User.findById(decoded.id);
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return
            }

            req.user = {
                id: decoded.id,
                role: user.role,
            }

            next();
        } catch (error) {
            // If token is expired, try to use refresh token
            console.log(`Authenticate Error: ${error}`);
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ error: 'Token expired' });
                return
            }
            res.status(401).json({ error: 'Invalid token' });
            return
        }
    } catch (error) {
        next(error);
    }
}

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role.toLowerCase())) {
            return res.status(403).json({
                success: false,
                message: `This action requires one of the following roles: ${roles.join(', ')}`
            });
        }

        next();
    };
};

// Middleware to check if user is admin
export const requireAdmin = requireRole('admin');

// // Middleware to check if user is alumni or admin
// const requireAlumniOrAdmin = requireRole('alumni', 'admin');

// // Middleware to check if user is student or alumni (excluding admin-only routes)
// const requireStudentOrAlumni = requireRole('student', 'alumni');