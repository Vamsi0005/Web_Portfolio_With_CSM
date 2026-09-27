import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().optional(),
    excerpt: z.string().min(5, 'Excerpt must be at least 5 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
    coverImage: z.string().optional().nullable(),
    tags: z.string().default('General'),
    author: z.string().default('Vamsi'),
    readTime: z.string().default('5 min read'),
    published: z.boolean().default(true)
  })
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid blog ID')
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().optional(),
    excerpt: z.string().min(5).optional(),
    content: z.string().min(20).optional(),
    coverImage: z.string().optional().nullable(),
    tags: z.string().optional(),
    author: z.string().optional(),
    readTime: z.string().optional(),
    published: z.boolean().optional()
  })
});
