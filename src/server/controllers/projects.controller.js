import * as projectsService from '../services/projects.service.js';
import { deleteUploadFile } from '../utils/file-cleanup.js';
import AppError from '../utils/app-error.js';

export const getProjects = async (req, res, next) => {
  try {
    const { status, type } = req.query;

    // Standard user requests only see published status
    const filterStatus = req.adminId ? status : 'published';

    const projects = await projectsService.getProjects({ status: filterStatus, type });
    
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await projectsService.getProjectBySlug(slug);

    // Guard private draft content from public views
    if (project.status === 'draft' && !req.adminId) {
      throw new AppError('Project not found', 404);
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a project cover image', 400);
    }

    const coverImage = `/uploads/projects/${req.file.filename}`;

    const projectData = {
      ...req.body,
      cover_image: coverImage,
    };

    const project = await projectsService.createProject(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (err) {
    // If db insert failed but we uploaded file, delete file immediately
    if (req.file) {
      deleteUploadFile(`/uploads/projects/${req.file.filename}`);
    }
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Retrieve current project details first to check ownership and access cover image
    const existing = await projectsService.getProjectById(id);

    let coverImage = existing.cover_image;
    let oldCoverToDelete = null;

    // Check if new cover image is uploaded
    if (req.file) {
      coverImage = `/uploads/projects/${req.file.filename}`;
      oldCoverToDelete = existing.cover_image;
    }

    const updateData = {
      ...req.body,
      cover_image: coverImage,
    };

    const updated = await projectsService.updateProject(id, updateData);

    // Enforce CTO Decision #025: Delete old file from disk upon successful replacement
    if (oldCoverToDelete) {
      deleteUploadFile(oldCoverToDelete);
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (err) {
    // If update failed but we uploaded new file, delete new file immediately to prevent orphan
    if (req.file) {
      deleteUploadFile(`/uploads/projects/${req.file.filename}`);
    }
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete project from database and retrieve cover/gallery file paths
    const deleted = await projectsService.deleteProject(id);

    // Enforce CTO Decision #025: Delete associated image assets from disk
    deleteUploadFile(deleted.cover_image);

    if (deleted.gallery_images && Array.isArray(deleted.gallery_images)) {
      deleted.gallery_images.forEach(img => deleteUploadFile(img));
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
