import db from '../config/db.js';
import AppError from '../utils/app-error.js';

export const getAlbums = async (filters = {}) => {
  const { status } = filters;
  const queryParams = [];
  let sql = 'SELECT id, title, slug, location, date, story, cover_image, status, created_at, updated_at FROM albums';
  
  if (status) {
    queryParams.push(status);
    sql += ` WHERE status = $${queryParams.length}`;
  } else {
    queryParams.push('published');
    sql += ` WHERE status = $${queryParams.length}`;
  }

  sql += ' ORDER BY created_at DESC, id DESC';

  const result = await db.query(sql, queryParams);
  return result.rows;
};

export const getAlbumBySlug = async (slug) => {
  const albumResult = await db.query(
    'SELECT id, title, slug, location, date, story, cover_image, status, created_at, updated_at FROM albums WHERE slug = $1',
    [slug]
  );

  if (albumResult.rows.length === 0) {
    throw new AppError('Album not found', 404);
  }

  const album = albumResult.rows[0];

  // Fetch Photos
  const photosResult = await db.query(
    'SELECT id, file_url, caption, sort_order FROM album_photos WHERE album_id = $1 ORDER BY sort_order ASC, id ASC',
    [album.id]
  );

  // Fetch Videos
  const videosResult = await db.query(
    'SELECT id, file_url, video_url, caption, sort_order FROM album_videos WHERE album_id = $1 ORDER BY sort_order ASC, id ASC',
    [album.id]
  );

  return {
    ...album,
    photos: photosResult.rows,
    videos: videosResult.rows,
  };
};

export const getAlbumById = async (id) => {
  const result = await db.query(
    'SELECT id, title, slug, location, date, story, cover_image, status FROM albums WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Album not found', 404);
  }

  return result.rows[0];
};

export const createAlbum = async (data) => {
  const { title, slug, location, date, story, cover_image, status } = data;

  const duplicate = await db.query('SELECT id FROM albums WHERE slug = $1', [slug]);
  if (duplicate.rows.length > 0) {
    throw new AppError('Album with this slug already exists', 400);
  }

  const result = await db.query(
    `INSERT INTO albums (title, slug, location, date, story, cover_image, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, title, slug, location, date, story, cover_image, status, created_at`,
    [title, slug, location, date, story, cover_image, status || 'draft']
  );

  return result.rows[0];
};

export const updateAlbum = async (id, data) => {
  const { title, location, date, story, cover_image, status } = data;

  const result = await db.query(
    `UPDATE albums
     SET title = $1, location = $2, date = $3, story = $4, cover_image = $5, status = $6, updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING id, title, slug, location, date, story, cover_image, status`,
    [title, location, date, story, cover_image, status, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Album not found to update', 404);
  }

  return result.rows[0];
};

export const deleteAlbum = async (id) => {
  // Query all media files associated with the album before deleting so we can clean up files
  const photosResult = await db.query('SELECT file_url FROM album_photos WHERE album_id = $1', [id]);
  const videosResult = await db.query('SELECT file_url FROM album_videos WHERE album_id = $1', [id]);
  const albumResult = await db.query('SELECT cover_image FROM albums WHERE id = $1', [id]);

  if (albumResult.rows.length === 0) {
    throw new AppError('Album not found to delete', 404);
  }

  const mediaFiles = [
    albumResult.rows[0].cover_image,
    ...photosResult.rows.map(row => row.file_url),
    ...videosResult.rows.map(row => row.file_url),
  ];

  // Execute database cascade delete
  await db.query('DELETE FROM albums WHERE id = $1', [id]);

  return {
    id,
    media_files: mediaFiles,
  };
};

export const addPhotoToAlbum = async (albumId, data) => {
  const { file_url, caption, sort_order } = data;

  // Verify album exists
  await getAlbumById(albumId);

  const result = await db.query(
    'INSERT INTO album_photos (album_id, file_url, caption, sort_order) VALUES ($1, $2, $3, $4) RETURNING id, album_id, file_url, caption, sort_order',
    [albumId, file_url, caption, sort_order || 0]
  );

  return result.rows[0];
};

export const deletePhotoFromAlbum = async (id) => {
  const result = await db.query(
    'DELETE FROM album_photos WHERE id = $1 RETURNING id, file_url',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Photo not found to delete', 404);
  }

  return result.rows[0];
};

export const addVideoToAlbum = async (albumId, data) => {
  const { file_url, video_url, caption, sort_order } = data;

  // Verify album exists
  await getAlbumById(albumId);

  const result = await db.query(
    'INSERT INTO album_videos (album_id, file_url, video_url, caption, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING id, album_id, file_url, video_url, caption, sort_order',
    [albumId, file_url, video_url, caption, sort_order || 0]
  );

  return result.rows[0];
};

export const deleteVideoFromAlbum = async (id) => {
  const result = await db.query(
    'DELETE FROM album_videos WHERE id = $1 RETURNING id, file_url',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Video not found to delete', 404);
  }

  return result.rows[0];
};
