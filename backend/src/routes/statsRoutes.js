import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, requireAdmin, getDashboardStats);

export default router;
