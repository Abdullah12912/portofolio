import { validateRequired, validateSlug, validateUrl } from './helpers.js';
import AppError from '../utils/app-error.js';

export const validateCreateAlbum = (req, res, next) => {
  try {
    const { title, slug, location, date, story } = req.body;

    validateRequired(title, 'title');
    validateSlug(slug, 'slug');
    validateRequired(location, 'location');
    validateRequired(date, 'date');
    validateRequired(story, 'story');

    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateAlbum = (req, res, next) => {
  try {
    const { title, slug, location, date, story } = req.body;

    // Enforce CTO Decision #024: Slug is immutable after creation
    if (slug !== undefined) {
      throw new AppError('Album "slug" cannot be updated once created', 400);
    }

    validateRequired(title, 'title');
    validateRequired(location, 'location');
    validateRequired(date, 'date');
    validateRequired(story, 'story');

    next();
  } catch (err) {
    next(err);
  }
};

export const validateAddPhoto = (req, res, next) => {
  try {
    const { sort_order } = req.body;

    if (sort_order !== undefined) {
      const parsed = parseInt(sort_order, 10);
      if (isNaN(parsed)) {
        throw new AppError('Field "sort_order" must be a valid integer', 400);
      }
      req.body.sort_order = parsed;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateAddVideo = (req, res, next) => {
  try {
    const { video_url, sort_order } = req.body;

    validateRequired(video_url, 'video_url');
    validateUrl(video_url, 'video_url');

    if (sort_order !== undefined) {
      const parsed = parseInt(sort_order, 10);
      if (isNaN(parsed)) {
        throw new AppError('Field "sort_order" must be a valid integer', 400);
      }
      req.body.sort_order = parsed;
    }

    next();
  } catch (err) {
    next(err);
  }
};
