import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createProjectSchema, updateProjectSchema } from '../validators/projectValidator.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', authenticateToken, requireAdmin, validate(createProjectSchema), createProject);
router.put('/:id', authenticateToken, requireAdmin, validate(updateProjectSchema), updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

export default router;
