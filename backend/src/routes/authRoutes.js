import { Router } from 'express';
import { login, refresh, logout, getMe, changePassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema, refreshSchema, changePasswordSchema } from '../validators/authValidator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/logout', authenticateToken, logout);
router.get('/me', authenticateToken, getMe);
router.post('/change-password', authenticateToken, validate(changePasswordSchema), changePassword);

export default router;
