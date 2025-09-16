import { body, query } from 'express-validator';

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
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
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

    // Conditional student/alumni fields
    body('collegeName')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('College name is required')
        .isLength({ max: 200 }).withMessage('College name cannot exceed 200 characters'),

    body('abcId')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('ABC ID is required')
        .isLength({ max: 50 }).withMessage('ABC ID cannot exceed 50 characters'),

    body('enrollment')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('Enrollment Number is required')
        .isLength({ max: 50 }).withMessage('Enrollment Number cannot exceed 50 characters'),

    body('degree')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('Degree is required')
        .isLength({ max: 100 }).withMessage('Degree cannot exceed 100 characters'),

    body('course')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('Course is required')
        .isLength({ max: 100 }).withMessage('Course cannot exceed 100 characters'),

    body('specialization')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('Specialization is required')
        .isLength({ max: 100 }).withMessage('Specialization cannot exceed 100 characters'),

    body('yearOfJoining')
        .if(body('role').not().equals('admin'))
        .isInt({ min: 1990, max: new Date().getFullYear() + 5 })
        .withMessage(`Year of joining must be between 1990 and ${new Date().getFullYear() + 5}`)
        .custom((value, { req }) => {
            if (req.body.yearOfPassing && parseInt(value) > parseInt(req.body.yearOfPassing)) {
                throw new Error('Year of joining cannot be after year of passing');
            }
            return true;
        }),

    body('yearOfPassing')
        .if(body('role').not().equals('admin'))
        .isInt({ min: 1990, max: new Date().getFullYear() + 10 })
        .withMessage(`Year of passing must be between 1990 and ${new Date().getFullYear() + 10}`)
        .custom((value, { req }) => {
            if (req.body.yearOfJoining && parseInt(value) < parseInt(req.body.yearOfJoining)) {
                throw new Error('Year of passing cannot be before year of joining');
            }
            return true;
        }),

    // Experience array
    body('experience').optional().isArray().withMessage('Experience must be an array'),
    body('experience.*.company')
        .optional()
        .trim()
        .notEmpty().withMessage('Company is required')
        .isLength({ max: 200 }).withMessage('Company cannot exceed 200 characters'),
    body('experience.*.position')
        .optional()
        .trim()
        .notEmpty().withMessage('Position is required')
        .isLength({ max: 100 }).withMessage('Position cannot exceed 100 characters'),
    body('experience.*.startDate')
        .optional()
        .isISO8601().withMessage('Start date must be a valid date'),
    body('experience.*.endDate')
        .optional()
        .isISO8601().withMessage('End date must be a valid date'),
    body('experience.*.description')
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    body('experience.*.isCurrent')
        .optional()
        .isBoolean().withMessage('isCurrent must be a boolean')
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
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s.'-]+$/)
        .withMessage('Name can only contain letters, spaces, apostrophes, and hyphens'),

    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio cannot exceed 500 characters'),

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

    body('city')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('City cannot exceed 100 characters'),

    // Experience array validation
    body('experience')
        .optional()
        .isArray().withMessage('Experience must be an array')
        .custom((jobs) => {
            if (jobs && jobs.length > 0) {
                for (const job of jobs) {
                    if (!job.company || job.company.length > 200) {
                        throw new Error('Each job must have a company name not exceeding 200 characters');
                    }
                    if (!job.position || job.position.length > 100) {
                        throw new Error('Each job must have a position not exceeding 100 characters');
                    }
                    if (!job.startDate || isNaN(Date.parse(job.startDate))) {
                        throw new Error('Each job must have a valid start date');
                    }
                    if (job.endDate && isNaN(Date.parse(job.endDate))) {
                        throw new Error('End date must be valid if provided');
                    }
                    if (job.description && job.description.length > 1000) {
                        throw new Error('Job description cannot exceed 1000 characters');
                    }
                    if (typeof job.isCurrent !== 'undefined' && typeof job.isCurrent !== 'boolean') {
                        throw new Error('isCurrent must be a boolean');
                    }
                }
            }
            return true;
        }),

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

    // Optional conditional fields for non-admins
    body('collegeName')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('College name cannot exceed 200 characters'),

    body('abcId')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('ABC ID cannot exceed 50 characters'),

    body('enrollment')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Enrollment cannot exceed 50 characters'),

    body('degree')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Degree cannot exceed 100 characters'),

    body('course')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Course cannot exceed 100 characters'),

    body('specialization')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Specialization cannot exceed 100 characters'),

    body('yearOfJoining')
        .optional()
        .isInt({ min: 2000, max: new Date().getFullYear() + 5 })
        .withMessage('Year of joining must be valid'),

    body('yearOfPassing')
        .optional()
        .isInt({ min: 2000, max: new Date().getFullYear() + 10 })
        .withMessage('Year of passing must be valid'),

    body('currentStatus')
        .optional()
        .isIn(['student', 'alumni'])
        .withMessage('Current status must be either student or alumni')
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


export const profileSearchValidator = [
    query('search')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Search query can be at most 100 characters'),

    query('collegeName')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('College name can be at most 200 characters'),

    query('degree')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Degree can be at most 100 characters'),

    query('course')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Course can be at most 100 characters'),

    query('specialization')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Specialization can be at most 100 characters'),

    query('yearOfPassing')
        .optional()
        .isInt({ min: 2000, max: new Date().getFullYear() + 10 })
        .withMessage('Year of passing must be a valid year'),

    query('skills')
        .optional()
        .trim()
        .isString()
        .withMessage('Skills must be a string'),

    // Optional: filter by experience company or position
    query('experienceCompany')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Experience company can be at most 200 characters'),

    query('experiencePosition')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Experience position can be at most 100 characters'),

    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be at least 1'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];
