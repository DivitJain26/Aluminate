import express from 'express';
import { profileSearchValidator } from '../middlewares/validation.middleware.js';
import { getProfiles, getProfileById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profiles', profileSearchValidator, getProfiles)

router.get('/profiles/:id', getProfileById)

export default router;