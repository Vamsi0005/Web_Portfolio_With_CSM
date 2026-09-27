import { Router } from 'express';
import { uploadImage, getMediaList, deleteMedia } from '../controllers/mediaController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = Router();

// Upload image (Admin only)
router.post('/image', authenticateToken, requireAdmin, upload.single('image'), uploadImage);

// List and delete media (Admin only)
router.get('/', authenticateToken, requireAdmin, getMediaList);
router.delete('/:id', authenticateToken, requireAdmin, deleteMedia);

export default router;
