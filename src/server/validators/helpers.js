import AppError from '../utils/app-error.js';

/**
 * Checks if a value exists and is not an empty string/array.
 */
export const validateRequired = (value, fieldName) => {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    throw new AppError(`Field "${fieldName}" is required and cannot be empty`, 400);
  }
  if (Array.isArray(value) && value.length === 0) {
    throw new AppError(`Field "${fieldName}" is required and must contain at least one item`, 400);
  }
};

/**
 * Validates if the string is a valid URL slug (lowercase alphanumeric and hyphens).
 */
export const validateSlug = (value, fieldName) => {
  validateRequired(value, fieldName);
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(value)) {
    throw new AppError(`Field "${fieldName}" is invalid: must be a valid URL-friendly slug containing only lowercase letters, numbers, and hyphens`, 400);
  }
};

/**
 * Validates if value matches the project type enum.
 */
export const validateProjectType = (value, fieldName) => {
  validateRequired(value, fieldName);
  const validTypes = ['software', 'research', 'academic', 'photography', 'video', 'creative', 'other'];
  if (!validTypes.includes(value)) {
    throw new AppError(`Field "${fieldName}" is invalid: must be one of [${validTypes.join(', ')}]`, 400);
  }
};

/**
 * Validates a web URL format.
 */
export const validateUrl = (value, fieldName) => {
  if (!value) return; // Optional URLs
  try {
    new URL(value);
  } catch (err) {
    throw new AppError(`Field "${fieldName}" is invalid: must be a well-formed absolute URL (e.g., https://example.com)`, 400);
  }
};
