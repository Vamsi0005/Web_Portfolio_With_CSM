import { z } from 'zod';

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Skill name is required'),
    category: z.string().min(1, 'Category is required'),
    proficiency: z.number().int().min(0).max(100).default(80),
    icon: z.string().optional().nullable(),
    order: z.number().int().default(0)
  })
});

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid skill ID')
  }),
  body: z.object({
    name: z.string().min(1, 'Skill name is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    proficiency: z.number().int().min(0).max(100).optional(),
    icon: z.string().optional().nullable(),
    order: z.number().int().optional()
  })
});
