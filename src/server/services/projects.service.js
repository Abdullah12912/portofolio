import db from '../config/db.js';
import AppError from '../utils/app-error.js';

export const getProjects = async (filters = {}) => {
  const { status, type } = filters;
  const queryParams = [];
  let sql = 'SELECT id, title, slug, type, description, cover_image, status, created_at, updated_at FROM projects';
  let conditions = [];

  // Filter by status (default is 'published' for public requests)
  if (status) {
    queryParams.push(status);
    conditions.push(`status = $${queryParams.length}`);
  } else {
    // Public default
    queryParams.push('published');
    conditions.push(`status = $${queryParams.length}`);
  }

  // Filter by project_type
  if (type) {
    queryParams.push(type);
    conditions.push(`type = $${queryParams.length}`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Sort newest first
  sql += ' ORDER BY created_at DESC, id DESC';

  const result = await db.query(sql, queryParams);
  return result.rows;
};

export const getProjectBySlug = async (slug) => {
  const result = await db.query(
    'SELECT id, title, slug, type, description, content, cover_image, gallery_images, external_links, status, created_at, updated_at FROM projects WHERE slug = $1',
    [slug]
  );

  if (result.rows.length === 0) {
    throw new AppError('Project not found', 404);
  }

  return result.rows[0];
};

export const getProjectById = async (id) => {
  const result = await db.query(
    'SELECT id, title, slug, type, description, content, cover_image, gallery_images, external_links, status FROM projects WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Project not found', 404);
  }

  return result.rows[0];
};

export const createProject = async (data) => {
  const { title, slug, type, description, content, cover_image, external_links, status } = data;

  // Check unique slug constraint
  const duplicate = await db.query('SELECT id FROM projects WHERE slug = $1', [slug]);
  if (duplicate.rows.length > 0) {
    throw new AppError('Project with this slug already exists', 400);
  }

  const result = await db.query(
    `INSERT INTO projects (title, slug, type, description, content, cover_image, external_links, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, title, slug, type, description, cover_image, status, created_at`,
    [title, slug, type, description, content, cover_image, JSON.stringify(external_links || {}), status || 'draft']
  );

  return result.rows[0];
};

export const updateProject = async (id, data) => {
  const { title, type, description, content, cover_image, external_links, status } = data;

  // Enforce slug immutability: query does not modify slug
  const result = await db.query(
    `UPDATE projects
     SET title = $1, type = $2, description = $3, content = $4, cover_image = $5, external_links = $6, status = $7, updated_at = CURRENT_TIMESTAMP
     WHERE id = $8
     RETURNING id, title, slug, type, description, cover_image, external_links, status`,
    [title, type, description, content, cover_image, JSON.stringify(external_links || {}), status, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Project not found to update', 404);
  }
  return result.rows[0];
};

export const deleteProject = async (id) => {
  const result = await db.query(
    'DELETE FROM projects WHERE id = $1 RETURNING id, cover_image, gallery_images',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Project not found to delete', 404);
  }

  return result.rows[0];
};
