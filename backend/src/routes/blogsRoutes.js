import { Router } from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createBlogSchema, updateBlogSchema } from '../validators/blogValidator.js';

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', authenticateToken, requireAdmin, validate(createBlogSchema), createBlog);
router.put('/:id', authenticateToken, requireAdmin, validate(updateBlogSchema), updateBlog);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlog);

export default router;
