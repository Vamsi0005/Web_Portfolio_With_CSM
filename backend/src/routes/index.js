import { Router } from 'express';
import authRoutes from './authRoutes.js';
import aboutRoutes from './aboutRoutes.js';
import skillsRoutes from './skillsRoutes.js';
import projectsRoutes from './projectsRoutes.js';
import blogsRoutes from './blogsRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import testimonialsRoutes from './testimonialsRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import contactRoutes from './contactRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import statsRoutes from './statsRoutes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount resource routes
router.use('/auth', authRoutes);
router.use('/about', aboutRoutes);
router.use('/skills', skillsRoutes);
router.use('/projects', projectsRoutes);
router.use('/blogs', blogsRoutes);
router.use('/experience', experienceRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/services', servicesRoutes);
router.use('/contact', contactRoutes);
router.use('/upload', mediaRoutes);
router.use('/media', mediaRoutes);
router.use('/stats', statsRoutes);

export default router;
