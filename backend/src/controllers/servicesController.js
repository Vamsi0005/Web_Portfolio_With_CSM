import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return sendSuccess(res, services, 'Services fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    return sendSuccess(res, service, 'Service fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await prisma.service.create({
      data: req.body
    });

    return sendSuccess(res, service, 'Service created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.update({
      where: { id },
      data: req.body
    });

    return sendSuccess(res, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};
