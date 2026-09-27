import { z } from 'zod';

export const createExperienceSchema = z.object({
  body: z.object({
    role: z.string().min(1, 'Role is required'),
    company: z.string().min(1, 'Company name is required'),
    companyUrl: z.string().url('Invalid company URL').optional().or(z.literal('')).nullable(),
    location: z.string().optional().nullable(),
    type: z.string().default('Full-time'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional().nullable(),
    isCurrent: z.boolean().default(false),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    achievements: z.string().optional().nullable(),
    technologies: z.string().optional().nullable(),
    order: z.number().int().default(0)
  })
});

export const updateExperienceSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid experience ID')
  }),
  body: z.object({
    role: z.string().min(1).optional(),
    company: z.string().min(1).optional(),
    companyUrl: z.string().url('Invalid company URL').optional().or(z.literal('')).nullable(),
    location: z.string().optional().nullable(),
    type: z.string().optional(),
    startDate: z.string().min(1).optional(),
    endDate: z.string().optional().nullable(),
    isCurrent: z.boolean().optional(),
    description: z.string().min(10).optional(),
    achievements: z.string().optional().nullable(),
    technologies: z.string().optional().nullable(),
    order: z.number().int().optional()
  })
});
