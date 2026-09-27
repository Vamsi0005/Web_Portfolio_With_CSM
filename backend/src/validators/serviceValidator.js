import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    icon: z.string().optional().nullable(),
    features: z.string().optional().nullable(),
    order: z.number().int().default(0)
  })
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid service ID')
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(10).optional(),
    icon: z.string().optional().nullable(),
    features: z.string().optional().nullable(),
    order: z.number().int().optional()
  })
});
