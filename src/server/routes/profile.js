import express from 'express';
import * as profileController from '../controllers/profile.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { createUploadMiddleware } from '../middleware/upload.middleware.js';
import {
  validateProfileUpdate,
  validateAchievement,
  validateActivity,
} from '../validators/profile.validator.js';

const router = express.Router();
const uploadCV = createUploadMiddleware('PROFILE');

// Public route
router.get('/', profileController.getProfile);

// Protected routes
router.put('/', authMiddleware, validateProfileUpdate, profileController.updateProfile);
router.post('/cv', authMiddleware, uploadCV.single('cv'), profileController.uploadCV);

// Achievements CRUD
router.post('/achievements', authMiddleware, validateAchievement, profileController.addAchievement);
router.delete('/achievements/:id', authMiddleware, profileController.deleteAchievement);

// Activities CRUD
router.post('/activities', authMiddleware, validateActivity, profileController.addActivity);
router.delete('/activities/:id', authMiddleware, profileController.deleteActivity);

export default router;
