import { Router } from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/servicesController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createServiceSchema, updateServiceSchema } from '../validators/serviceValidator.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authenticateToken, requireAdmin, validate(createServiceSchema), createService);
router.put('/:id', authenticateToken, requireAdmin, validate(updateServiceSchema), updateService);
router.delete('/:id', authenticateToken, requireAdmin, deleteService);

export default router;
