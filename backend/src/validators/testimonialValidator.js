import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({
    clientName: z.string().min(1, 'Client name is required'),
    clientRole: z.string().min(1, 'Client role is required'),
    clientCompany: z.string().min(1, 'Company is required'),
    clientAvatar: z.string().optional().nullable(),
    rating: z.number().int().min(1).max(5).default(5),
    content: z.string().min(10, 'Testimonial content must be at least 10 characters'),
    projectTitle: z.string().optional().nullable(),
    order: z.number().int().default(0)
  })
});

export const updateTestimonialSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid testimonial ID')
  }),
  body: z.object({
    clientName: z.string().min(1).optional(),
    clientRole: z.string().min(1).optional(),
    clientCompany: z.string().min(1).optional(),
    clientAvatar: z.string().optional().nullable(),
    rating: z.number().int().min(1).max(5).optional(),
    content: z.string().min(10).optional(),
    projectTitle: z.string().optional().nullable(),
    order: z.number().int().optional()
  })
});
