import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().optional(),
    summary: z.string().min(5, 'Summary must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    coverImage: z.string().optional().nullable(),
    technologies: z.string().min(1, 'Technologies list is required'),
    liveUrl: z.string().url('Invalid live demo URL').optional().or(z.literal('')).nullable(),
    githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')).nullable(),
    featured: z.boolean().default(false),
    order: z.number().int().default(0)
  })
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid project ID')
  }),
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    slug: z.string().optional(),
    summary: z.string().min(5).optional(),
    description: z.string().min(10).optional(),
    coverImage: z.string().optional().nullable(),
    technologies: z.string().optional(),
    liveUrl: z.string().url('Invalid live demo URL').optional().or(z.literal('')).nullable(),
    githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')).nullable(),
    featured: z.boolean().optional(),
    order: z.number().int().optional()
  })
});
