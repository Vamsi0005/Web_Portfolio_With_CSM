import prisma from '../config/db.js';
import { sendContactNotificationEmail } from '../config/email.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    // 1. Save to PostgreSQL database
    const savedMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
        ipAddress: typeof ipAddress === 'string' ? ipAddress : JSON.stringify(ipAddress)
      }
    });

    // 2. Attempt email notification in background (non-blocking)
    sendContactNotificationEmail({ name, email, subject, message }).catch((err) => {
      console.warn('Background email send error:', err);
    });

    // 3. Return success response
    return sendSuccess(
      res,
      {
        id: savedMessage.id,
        createdAt: savedMessage.createdAt
      },
      'Thank you for your message! I will get back to you as soon as possible.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, isRead, search } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const where = {};
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [total, unreadCount, messages] = await Promise.all([
      prisma.message.count({ where }),
      prisma.message.count({ where: { isRead: false } }),
      prisma.message.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return res.status(200).json({
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
      meta: {
        unreadCount
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
      where: { id }
    });

    if (!message) {
      return sendError(res, 'Message not found', 404);
    }

    return sendSuccess(res, message, 'Message fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead = true } = req.body;

    const message = await prisma.message.update({
      where: { id },
      data: { isRead }
    });

    return sendSuccess(res, message, `Message marked as ${isRead ? 'read' : 'unread'}`);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.message.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};
