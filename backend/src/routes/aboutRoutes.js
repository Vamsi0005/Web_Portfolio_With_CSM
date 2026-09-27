import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { updateAboutSchema } from '../validators/aboutValidator.js';

const router = Router();

router.get('/', getAbout);
router.put('/', authenticateToken, requireAdmin, validate(updateAboutSchema), updateAbout);

export default router;
