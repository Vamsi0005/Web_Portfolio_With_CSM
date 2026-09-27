import multer from 'multer';
import { sendError } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // Multer Errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, 'File too large. Maximum allowed size is 10MB.', 400);
    }
    return sendError(res, `Upload error: ${err.message}`, 400);
  }

  // File filter error
  if (err.message && err.message.includes('Only image files')) {
    return sendError(res, err.message, 400);
  }

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    const fields = err.meta?.target || ['field'];
    return sendError(res, `A record with this ${fields.join(', ')} already exists.`, 409);
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return sendError(res, 'The requested resource was not found.', 404);
  }

  // JSON syntax error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 'Malformed JSON payload.', 400);
  }

  // Default server error
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error occurred.' 
    : (err.message || 'Internal server error.');

  return sendError(res, message, err.statusCode || 500);
};
