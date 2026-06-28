import express from 'express';
import * as albumsController from '../controllers/albums.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import authOptionalMiddleware from '../middleware/auth-optional.middleware.js';
import { createUploadMiddleware } from '../middleware/upload.middleware.js';
import {
  validateCreateAlbum,
  validateUpdateAlbum,
  validateAddPhoto,
  validateAddVideo,
} from '../validators/album.validator.js';

const router = express.Router();
const uploadAlbum = createUploadMiddleware('ALBUM');

// Public routes (authOptionalMiddleware allows admins to view draft details on public URLs)
router.get('/', authOptionalMiddleware, albumsController.getAlbums);
router.get('/:slug', authOptionalMiddleware, albumsController.getAlbum);

// Protected routes
router.post(
  '/',
  authMiddleware,
  uploadAlbum.single('cover_image'),
  validateCreateAlbum,
  albumsController.createAlbum
);

router.put(
  '/:id',
  authMiddleware,
  uploadAlbum.single('cover_image'),
  validateUpdateAlbum,
  albumsController.updateAlbum
);

router.delete('/:id', authMiddleware, albumsController.deleteAlbum);

// Album Photos sub-collection
router.post(
  '/:id/photos',
  authMiddleware,
  uploadAlbum.single('photo'),
  validateAddPhoto,
  albumsController.addPhoto
);

router.delete('/photos/:id', authMiddleware, albumsController.deletePhoto);

// Album Videos sub-collection
router.post(
  '/:id/videos',
  authMiddleware,
  uploadAlbum.single('thumbnail'),
  validateAddVideo,
  albumsController.addVideo
);

router.delete('/videos/:id', authMiddleware, albumsController.deleteVideo);

export default router;
