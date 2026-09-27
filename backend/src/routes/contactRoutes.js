import { Router } from 'express';
import { submitContact, getMessages, getMessageById, markAsRead, deleteMessage } from '../controllers/contactController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { submitContactSchema } from '../validators/contactValidator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public contact submission
router.post('/', contactLimiter, validate(submitContactSchema), submitContact);

// Admin contact message management
router.get('/messages', authenticateToken, requireAdmin, getMessages);
router.get('/messages/:id', authenticateToken, requireAdmin, getMessageById);
router.patch('/messages/:id/read', authenticateToken, requireAdmin, markAsRead);
router.delete('/messages/:id', authenticateToken, requireAdmin, deleteMessage);

export default router;
