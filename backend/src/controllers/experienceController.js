import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getExperience = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { isCurrent: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return sendSuccess(res, experiences, 'Experience records fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const experience = await prisma.experience.findUnique({
      where: { id }
    });

    if (!experience) {
      return sendError(res, 'Experience record not found', 404);
    }

    return sendSuccess(res, experience, 'Experience record fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const experience = await prisma.experience.create({
      data: req.body
    });

    return sendSuccess(res, experience, 'Experience record created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    const experience = await prisma.experience.update({
      where: { id },
      data: req.body
    });

    return sendSuccess(res, experience, 'Experience record updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.experience.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Experience record deleted successfully');
  } catch (error) {
    next(error);
  }
};
