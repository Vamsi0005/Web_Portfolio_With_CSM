import { Router } from 'express';
import { getSkills, getSkillById, createSkill, updateSkill, deleteSkill } from '../controllers/skillsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createSkillSchema, updateSkillSchema } from '../validators/skillValidator.js';

const router = Router();

router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', authenticateToken, requireAdmin, validate(createSkillSchema), createSkill);
router.put('/:id', authenticateToken, requireAdmin, validate(updateSkillSchema), updateSkill);
router.delete('/:id', authenticateToken, requireAdmin, deleteSkill);

export default router;
