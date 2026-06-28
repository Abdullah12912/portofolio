import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute base path of uploads
const UPLOADS_BASE_PATH = path.resolve(__dirname, '../../public/uploads');

/**
 * Safely deletes a file from the uploads directory.
 * Accepts either a relative web URL (e.g. '/uploads/projects/file.jpg')
 * or an absolute filesystem path.
 */
export const deleteUploadFile = (filePathOrUrl) => {
  if (!filePathOrUrl) return;

  try {
    let absolutePath;

    if (path.isAbsolute(filePathOrUrl)) {
      absolutePath = path.resolve(filePathOrUrl);
    } else {
      // Convert web URL to absolute path
      const normalizedUrl = filePathOrUrl.startsWith('/') ? filePathOrUrl.substring(1) : filePathOrUrl;
      absolutePath = path.resolve(__dirname, '../../public', normalizedUrl);
    }

    // Security check: Must reside within UPLOADS_BASE_PATH
    if (!absolutePath.startsWith(UPLOADS_BASE_PATH)) {
      console.warn(`⚠️ Security Block: Attempted file deletion outside uploads directory: ${filePathOrUrl}`);
      return;
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`✓ Deleted file from disk: ${absolutePath}`);
    } else {
      console.log(`ℹ File not found on disk: ${absolutePath}`);
    }
  } catch (err) {
    console.error(`💥 Failed to delete file ${filePathOrUrl}:`, err.message);
  }
};

/**
 * Safely deletes multiple files from the uploads directory.
 */
export const deleteUploadFiles = (files) => {
  if (!files) return;

  if (Array.isArray(files)) {
    files.forEach(file => deleteUploadFile(file));
  } else {
    deleteUploadFile(files);
  }
};
