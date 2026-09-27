import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
        { proficiency: 'desc' }
      ]
    });

    return sendSuccess(res, skills, 'Skills fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getSkillById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.findUnique({
      where: { id }
    });

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, skill, 'Skill fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await prisma.skill.create({
      data: req.body
    });

    return sendSuccess(res, skill, 'Skill created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.update({
      where: { id },
      data: req.body
    });

    return sendSuccess(res, skill, 'Skill updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};
