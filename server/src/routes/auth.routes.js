import express from 'express';
import { login, register, refreshToken, getCurrentUser, logout ,updateProfile} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { validateRegister, validateLogin } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

router.post('/refresh', refreshToken);

router.get('/me', authenticateToken, getCurrentUser);
router.put('/updateProfile', updateProfile);

export default router;