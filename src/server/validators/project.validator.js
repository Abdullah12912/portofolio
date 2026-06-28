import { validateRequired, validateSlug, validateProjectType, validateUrl } from './helpers.js';
import AppError from '../utils/app-error.js';

export const validateCreateProject = (req, res, next) => {
  try {
    const { title, slug, type, description, content, external_links } = req.body;

    validateRequired(title, 'title');
    validateSlug(slug, 'slug');
    validateProjectType(type, 'type');
    validateRequired(description, 'description');
    validateRequired(content, 'content');

    // Parse external_links if passed as string (from multipart form data)
    let links = external_links;
    if (typeof external_links === 'string') {
      try {
        links = JSON.parse(external_links);
      } catch (err) {
        throw new AppError('Field "external_links" must be a valid JSON string', 400);
      }
    }

    if (links) {
      if (typeof links !== 'object' || Array.isArray(links)) {
        throw new AppError('Field "external_links" must be a key-value object', 400);
      }
      // Validate URLs inside
      for (const [key, value] of Object.entries(links)) {
        validateUrl(value, `external_links.${key}`);
      }
    }

    // Attach parsed links to body so controllers can use it directly
    req.body.external_links = links || {};

    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateProject = (req, res, next) => {
  try {
    const { title, slug, type, description, content, external_links } = req.body;

    // Enforce CTO Decision #024: Slug is immutable after creation
    if (slug !== undefined) {
      throw new AppError('Project "slug" cannot be updated once created', 400);
    }

    validateRequired(title, 'title');
    validateProjectType(type, 'type');
    validateRequired(description, 'description');
    validateRequired(content, 'content');

    // Parse external_links if passed as string (multipart form data)
    let links = external_links;
    if (typeof external_links === 'string') {
      try {
        links = JSON.parse(external_links);
      } catch (err) {
        throw new AppError('Field "external_links" must be a valid JSON string', 400);
      }
    }

    if (links) {
      if (typeof links !== 'object' || Array.isArray(links)) {
        throw new AppError('Field "external_links" must be a key-value object', 400);
      }
      for (const [key, value] of Object.entries(links)) {
        validateUrl(value, `external_links.${key}`);
      }
    }

    req.body.external_links = links || {};

    next();
  } catch (err) {
    next(err);
  }
};
