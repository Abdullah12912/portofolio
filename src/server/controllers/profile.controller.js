import * as profileService from '../services/profile.service.js';
import AppError from '../utils/app-error.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile();
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await profileService.updateProfile(req.body);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadCV = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a CV PDF file', 400);
    }

    // Relative web URL
    const cvUrl = `/uploads/profiles/${req.file.filename}`;
    const result = await profileService.updateProfileCV(cvUrl);

    res.status(200).json({
      success: true,
      message: 'CV uploaded successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const addAchievement = async (req, res, next) => {
  try {
    const achievement = await profileService.addAchievement(req.body);
    res.status(201).json({
      success: true,
      message: 'Achievement added successfully',
      data: achievement,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    await profileService.deleteAchievement(id);

    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const addActivity = async (req, res, next) => {
  try {
    const activity = await profileService.addActivity(req.body);
    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      data: activity,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await profileService.deleteActivity(id);

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
