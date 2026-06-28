import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import AppError from '../utils/app-error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target upload subdirectories constants
export const UPLOAD_DIRS = {
  PROFILE: 'profiles',
  PROJECT: 'projects',
  ALBUM: 'albums',
};

// Base upload path
const BASE_UPLOAD_PATH = path.join(__dirname, '../../public/uploads');

// Create base directory if it doesn't exist
if (!fs.existsSync(BASE_UPLOAD_PATH)) {
  fs.mkdirSync(BASE_UPLOAD_PATH, { recursive: true });
}

// Function to generate customized multer middleware per folder target
export const createUploadMiddleware = (dirType) => {
  const targetDir = UPLOAD_DIRS[dirType];
  if (!targetDir) {
    throw new Error(`Invalid upload directory type: ${dirType}`);
  }

  const uploadPath = path.join(BASE_UPLOAD_PATH, targetDir);

  // Create directory if not exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Format: type-timestamp-random.extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${targetDir}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = {
      [UPLOAD_DIRS.PROFILE]: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      [UPLOAD_DIRS.PROJECT]: ['image/jpeg', 'image/png', 'image/webp'],
      [UPLOAD_DIRS.ALBUM]: ['image/jpeg', 'image/png', 'image/webp'],
    };

    const allowed = allowedMimeTypes[targetDir];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError(`Invalid file format: Only ${allowed.join(', ')} formats are allowed`, 400), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  });
};
