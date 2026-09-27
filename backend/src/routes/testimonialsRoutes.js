import { Router } from 'express';
import { getTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createTestimonialSchema, updateTestimonialSchema } from '../validators/testimonialValidator.js';

const router = Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticateToken, requireAdmin, validate(createTestimonialSchema), createTestimonial);
router.put('/:id', authenticateToken, requireAdmin, validate(updateTestimonialSchema), updateTestimonial);
router.delete('/:id', authenticateToken, requireAdmin, deleteTestimonial);

export default router;
