import { Router } from 'express';
import { getExperience, getExperienceById, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createExperienceSchema, updateExperienceSchema } from '../validators/experienceValidator.js';

const router = Router();

router.get('/', getExperience);
router.get('/:id', getExperienceById);
router.post('/', authenticateToken, requireAdmin, validate(createExperienceSchema), createExperience);
router.put('/:id', authenticateToken, requireAdmin, validate(updateExperienceSchema), updateExperience);
router.delete('/:id', authenticateToken, requireAdmin, deleteExperience);

export default router;
