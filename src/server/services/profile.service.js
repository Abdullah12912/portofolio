import db from '../config/db.js';
import AppError from '../utils/app-error.js';

export const getProfile = async () => {
  // Fetch singleton profile (ID 1)
  const profileResult = await db.query(
    'SELECT id, fullname, bio, current_activity, cv_url, competencies, social_links FROM profile WHERE id = 1'
  );

  if (profileResult.rows.length === 0) {
    throw new AppError('Profile details not found in database', 404);
  }

  const profile = profileResult.rows[0];

  // Fetch achievements
  const achievementsResult = await db.query(
    'SELECT id, title, year, description FROM achievements WHERE profile_id = 1 ORDER BY year DESC, id DESC'
  );

  // Fetch activities
  const activitiesResult = await db.query(
    'SELECT id, title, TO_CHAR(date, \'YYYY-MM-DD\') AS date, description FROM activities WHERE profile_id = 1 ORDER BY date DESC, id DESC'
  );

  return {
    ...profile,
    achievements: achievementsResult.rows,
    activities: activitiesResult.rows,
  };
};

export const updateProfile = async (data) => {
  const { fullname, bio, current_activity, competencies, social_links } = data;

  const result = await db.query(
    `UPDATE profile 
     SET fullname = $1, bio = $2, current_activity = $3, competencies = $4, social_links = $5, updated_at = CURRENT_TIMESTAMP
     WHERE id = 1
     RETURNING id, fullname, bio, current_activity, cv_url, competencies, social_links`,
    [fullname, bio, current_activity, competencies, JSON.stringify(social_links || {})]
  );

  if (result.rows.length === 0) {
    throw new AppError('Profile not found to update', 404);
  }

  return result.rows[0];
};

export const updateProfileCV = async (cvUrl) => {
  const result = await db.query(
    'UPDATE profile SET cv_url = $1, updated_at = CURRENT_TIMESTAMP WHERE id = 1 RETURNING id, cv_url',
    [cvUrl]
  );

  if (result.rows.length === 0) {
    throw new AppError('Profile not found to update CV', 404);
  }

  return result.rows[0];
};

export const addAchievement = async (data) => {
  const { title, year, description } = data;

  const result = await db.query(
    'INSERT INTO achievements (profile_id, title, year, description) VALUES (1, $1, $2, $3) RETURNING id, title, year, description',
    [title, year, description]
  );

  return result.rows[0];
};

export const deleteAchievement = async (id) => {
  const result = await db.query(
    'DELETE FROM achievements WHERE id = $1 RETURNING id',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Achievement not found to delete', 404);
  }

  return result.rows[0];
};

export const addActivity = async (data) => {
  const { title, date, description } = data;

  const result = await db.query(
    'INSERT INTO activities (profile_id, title, date, description) VALUES (1, $1, $2, $3) RETURNING id, title, TO_CHAR(date, \'YYYY-MM-DD\') AS date, description',
    [title, date, description]
  );

  return result.rows[0];
};

export const deleteActivity = async (id) => {
  const result = await db.query(
    'DELETE FROM activities WHERE id = $1 RETURNING id',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Activity not found to delete', 404);
  }

  return result.rows[0];
};
