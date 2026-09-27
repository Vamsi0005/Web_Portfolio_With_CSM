import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return sendSuccess(res, testimonials, 'Testimonials fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id }
    });

    if (!testimonial) {
      return sendError(res, 'Testimonial not found', 404);
    }

    return sendSuccess(res, testimonial, 'Testimonial fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: req.body
    });

    return sendSuccess(res, testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: req.body
    });

    return sendSuccess(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};
