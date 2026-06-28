import * as albumsService from '../services/albums.service.js';
import { deleteUploadFile, deleteUploadFiles } from '../utils/file-cleanup.js';
import AppError from '../utils/app-error.js';

export const getAlbums = async (req, res, next) => {
  try {
    const { status } = req.query;

    // Standard user requests only see published status
    const filterStatus = req.adminId ? status : 'published';

    const albums = await albumsService.getAlbums({ status: filterStatus });
    
    res.status(200).json({
      success: true,
      data: albums,
    });
  } catch (err) {
    next(err);
  }
};

export const getAlbum = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const album = await albumsService.getAlbumBySlug(slug);

    // Guard private draft content from public views
    if (album.status === 'draft' && !req.adminId) {
      throw new AppError('Album not found', 404);
    }

    res.status(200).json({
      success: true,
      data: album,
    });
  } catch (err) {
    next(err);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload an album cover image', 400);
    }

    const coverImage = `/uploads/albums/${req.file.filename}`;

    const albumData = {
      ...req.body,
      cover_image: coverImage,
    };

    const album = await albumsService.createAlbum(albumData);

    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: album,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAlbum = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existing = await albumsService.getAlbumById(id);

    let coverImage = existing.cover_image;
    let oldCoverToDelete = null;

    // Check if new cover image is uploaded
    if (req.file) {
      coverImage = `/uploads/albums/${req.file.filename}`;
      oldCoverToDelete = existing.cover_image;
    }

    const updateData = {
      ...req.body,
      cover_image: coverImage,
    };

    const updated = await albumsService.updateAlbum(id, updateData);

    // Clean up replaced cover file from disk
    if (oldCoverToDelete) {
      deleteUploadFile(oldCoverToDelete);
    }

    res.status(200).json({
      success: true,
      message: 'Album updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete album from database and retrieve cover/media file paths
    const deleted = await albumsService.deleteAlbum(id);

    // Enforce CTO Decision #027: Delete all cover and media files from disk
    deleteUploadFiles(deleted.media_files);

    res.status(200).json({
      success: true,
      message: 'Album and all associated media files deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const addPhoto = async (req, res, next) => {
  const { id } = req.params; // Album ID

  try {
    if (!req.file) {
      throw new AppError('Please upload a photo image file', 400);
    }

    const fileUrl = `/uploads/albums/${req.file.filename}`;

    const photoData = {
      ...req.body,
      file_url: fileUrl,
    };

    const photo = await albumsService.addPhotoToAlbum(id, photoData);

    res.status(201).json({
      success: true,
      message: 'Photo added to album successfully',
      data: photo,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePhoto = async (req, res, next) => {
  try {
    const { id } = req.params; // Photo ID

    const deleted = await albumsService.deletePhotoFromAlbum(id);

    // Clean up photo file from disk
    deleteUploadFile(deleted.file_url);

    res.status(200).json({
      success: true,
      message: 'Photo deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const addVideo = async (req, res, next) => {
  const { id } = req.params; // Album ID

  try {
    if (!req.file) {
      throw new AppError('Please upload a local video thumbnail image', 400);
    }

    const fileUrl = `/uploads/albums/${req.file.filename}`;

    const videoData = {
      ...req.body,
      file_url: fileUrl,
    };

    const video = await albumsService.addVideoToAlbum(id, videoData);

    res.status(201).json({
      success: true,
      message: 'Video added to album successfully',
      data: video,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params; // Video ID

    const deleted = await albumsService.deleteVideoFromAlbum(id);

    // Clean up video thumbnail from disk
    deleteUploadFile(deleted.file_url);

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
