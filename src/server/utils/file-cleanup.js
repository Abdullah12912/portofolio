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

    // On Windows, a path starting with '/' (e.g. '/uploads/...') returns true for path.isAbsolute.
    // We treat it as a web URL if it starts with '/' to resolve it correctly inside the public folder.
    if (path.isAbsolute(filePathOrUrl) && !filePathOrUrl.startsWith('/')) {
      absolutePath = path.resolve(filePathOrUrl);
    } else {
      // Convert web URL to absolute path relative to public directory
      const normalizedUrl = filePathOrUrl.startsWith('/') ? filePathOrUrl.substring(1) : filePathOrUrl;
      absolutePath = path.resolve(__dirname, '../../public', normalizedUrl);
    }

    // Standardize paths (lowercase and standard resolve) for safe OS comparison
    const resolvedPath = path.normalize(absolutePath).toLowerCase();
    const resolvedBase = path.normalize(UPLOADS_BASE_PATH).toLowerCase();

    // Security check: Must reside within UPLOADS_BASE_PATH
    if (!resolvedPath.startsWith(resolvedBase)) {
      console.warn(`⚠️ Security Block: Attempted file deletion outside uploads directory:\nResolved Path: ${resolvedPath}\nBase Path: ${resolvedBase}`);
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
