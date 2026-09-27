import path from 'path';
import fs from 'fs';
import prisma from '../config/db.js';
import { config } from '../config/env.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file uploaded.', 400);
    }

    const { filename, originalname, mimetype, size } = req.file;
    const { altText } = req.body;

    // Build URL for public access
    const relativeUrl = `/uploads/${filename}`;
    const fullUrl = `${config.baseUrl}${relativeUrl}`;

    // Save record to database
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: originalname,
        mimeType: mimetype,
        size,
        url: fullUrl,
        altText: altText || originalname
      }
    });

    return sendSuccess(
      res,
      {
        ...media,
        relativeUrl
      },
      'Image uploaded successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getMediaList = async (req, res, next) => {
  try {
    const { search } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } }
      ];
    }

    const mediaList = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return sendSuccess(res, mediaList, 'Media list fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (!media) {
      return sendError(res, 'Media file not found in records.', 404);
    }

    // Try deleting physical file from uploads folder
    try {
      const filePath = path.join(process.cwd(), 'src', config.uploadDir, media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      console.warn('Failed to delete physical file:', fsErr.message);
    }

    await prisma.media.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Media deleted successfully');
  } catch (error) {
    next(error);
  }
};
