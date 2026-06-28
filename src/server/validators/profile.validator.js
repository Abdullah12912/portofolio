import { validateRequired } from './helpers.js';
import AppError from '../utils/app-error.js';

export const validateProfileUpdate = (req, res, next) => {
  try {
    const { fullname, bio, current_activity, competencies, social_links } = req.body;

    validateRequired(fullname, 'fullname');
    validateRequired(bio, 'bio');
    validateRequired(current_activity, 'current_activity');
    validateRequired(competencies, 'competencies');

    if (!Array.isArray(competencies)) {
      throw new AppError('Field "competencies" must be an array of strings', 400);
    }

    if (social_links !== undefined && (typeof social_links !== 'object' || social_links === null)) {
      throw new AppError('Field "social_links" must be a valid JSON object', 400);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateAchievement = (req, res, next) => {
  try {
    const { title, year, description } = req.body;

    validateRequired(title, 'title');
    validateRequired(year, 'year');

    // Year validation: must be a string representing a valid year or simple label
    if (typeof year !== 'string' || year.trim().length === 0) {
      throw new AppError('Field "year" must be a valid non-empty string', 400);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateActivity = (req, res, next) => {
  try {
    const { title, date, description } = req.body;

    validateRequired(title, 'title');
    validateRequired(date, 'date');

    // Date validation: YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date) || isNaN(Date.parse(date))) {
      throw new AppError('Field "date" must be a valid ISO Date string in YYYY-MM-DD format', 400);
    }

    next();
  } catch (err) {
    next(err);
  }
};
