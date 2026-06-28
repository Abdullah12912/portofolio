import express from 'express';
import * as projectsController from '../controllers/projects.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import authOptionalMiddleware from '../middleware/auth-optional.middleware.js';
import { createUploadMiddleware } from '../middleware/upload.middleware.js';
import {
  validateCreateProject,
  validateUpdateProject,
} from '../validators/project.validator.js';

const router = express.Router();
const uploadProject = createUploadMiddleware('PROJECT');

// Public routes (authOptionalMiddleware allows admins to view draft details on public URLs)
router.get('/', authOptionalMiddleware, projectsController.getProjects);
router.get('/:slug', authOptionalMiddleware, projectsController.getProject);

// Protected routes
router.post(
  '/',
  authMiddleware,
  uploadProject.single('cover_image'),
  validateCreateProject,
  projectsController.createProject
);

router.put(
  '/:id',
  authMiddleware,
  uploadProject.single('cover_image'),
  validateUpdateProject,
  projectsController.updateProject
);

router.delete('/:id', authMiddleware, projectsController.deleteProject);

export default router;
