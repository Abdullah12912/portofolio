import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute base path of uploads
const UPLOADS_BASE_PATH = path.resolve(__dirname, '../../public/uploads');

/**
 * Safely deletes a file from the uploads directory.
 * Prevents directory traversal attacks by validating that the file path resolves
 * within the absolute uploads directory.
 */
export const deleteUploadFile = (fileUrl) => {
  if (!fileUrl) return;

  try {
    // Convert web URL (e.g. /uploads/projects/file.jpg) to absolute filesystem path
    const normalizedUrl = fileUrl.startsWith('/') ? fileUrl.substring(1) : fileUrl;
    const absolutePath = path.resolve(__dirname, '../../public', normalizedUrl);

    // Security check: Must reside within UPLOADS_BASE_PATH
    if (!absolutePath.startsWith(UPLOADS_BASE_PATH)) {
      console.warn(`⚠️ Security Block: Attempted file deletion outside uploads directory: ${fileUrl}`);
      return;
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`✓ Deleted file from disk: ${absolutePath}`);
    } else {
      console.log(`ℹ File not found on disk: ${absolutePath}`);
    }
  } catch (err) {
    console.error(`💥 Failed to delete file ${fileUrl}:`, err.message);
  }
};
