import { body } from 'express-validator';

export const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s.'-]+$/).withMessage('Name can only contain letters, spaces, apostrophes, and hyphens'),

    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email address')
        .isLength({ max: 255 }).withMessage('Email cannot exceed 255 characters'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@$!%*?&)'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    body('collegeName')
        .trim()
        .notEmpty().withMessage('College name is required')
        .isLength({ max: 200 }).withMessage('College name cannot exceed 200 characters'),

    body('abcId')
        .trim()
        .notEmpty().withMessage('ABC ID is required')
        .isLength({ max: 50 }).withMessage('ABC ID exceed 50 characters'),

    body('enrollment')
        .trim()
        .notEmpty().withMessage('Enrollment Number is required')
        .isLength({ max: 50 }).withMessage('Enrollment Number cannot exceed 50 characters'),
        
    body('course')
        .trim()
        .notEmpty().withMessage('Course is required')
        .isLength({ max: 100 }).withMessage('Course cannot exceed 100 characters'),

    body('specialization')
        .trim()
        .notEmpty().withMessage('Specialization is required')
        .isLength({ max: 100 }).withMessage('Specialization cannot exceed 100 characters'),

    body('yearOfJoining')
        .isInt({ min: 2000, max: new Date().getFullYear() + 5 })
        .withMessage(`Year of joining must be between 2000 and ${new Date().getFullYear() + 5}`)
        .custom((value, { req }) => {
            if (req.body.yearOfPassing && parseInt(value) > parseInt(req.body.yearOfPassing)) {
                throw new Error('Year of joining cannot be after year of passing');
            }
            return true;
        }),

    body('yearOfPassing')
        .isInt({ min: 2000, max: new Date().getFullYear() + 10 })
        .withMessage(`Year of passing must be between 2000 and ${new Date().getFullYear() + 10}`)
        .custom((value, { req }) => {
            if (req.body.yearOfJoining && parseInt(value) < parseInt(req.body.yearOfJoining)) {
                throw new Error('Year of passing cannot be before year of joining');
            }
            return true;
        }),
];

export const validateLogin = [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
];

export const validateUpdateProfile = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s.'-]+$/).withMessage('Name can only contain letters, spaces, apostrophes, and hyphens'),

    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),

    body('skills')
        .optional()
        .isArray().withMessage('Skills must be an array')
        .custom((skills) => {
            if (skills && skills.length > 0) {
                for (const skill of skills) {
                    if (typeof skill !== 'string' || skill.length > 50) {
                        throw new Error('Each skill must be a string not exceeding 50 characters');
                    }
                }
            }
            return true;
        }),

    body('currentCompany')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Current company cannot exceed 200 characters'),

    body('currentPosition')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Current position cannot exceed 100 characters'),

    body('linkedinProfile')
        .optional()
        .trim()
        .isURL().withMessage('Please provide a valid LinkedIn URL')
        .custom((value) => {
            if (value && !value.includes('linkedin.com')) {
                throw new Error('Please provide a valid LinkedIn URL');
            }
            return true;
        }),

    body('githubProfile')
        .optional()
        .trim()
        .isURL().withMessage('Please provide a valid GitHub URL')
        .custom((value) => {
            if (value && !value.includes('github.com')) {
                throw new Error('Please provide a valid GitHub URL');
            }
            return true;
        }),

    body('currentStatus')
        .optional()
        .isIn(['student', 'alumni']).withMessage('Current status must be either student or alumni')
];

export const validateChangePassword = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),

    body('newPassword')
        .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('New password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('New password must contain at least one lowercase letter')
        .matches(/\d/).withMessage('New password must contain at least one number')
        .matches(/[@$!%*?&]/).withMessage('New password must contain at least one special character (@$!%*?&)'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];