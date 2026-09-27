import { z } from 'zod';

export const updateAboutSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    shortBio: z.string().min(10, 'Short bio must be at least 10 characters'),
    fullBio: z.string().min(20, 'Full bio must be at least 20 characters'),
    avatarUrl: z.string().optional().nullable(),
    resumeUrl: z.string().optional().nullable(),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    yearsExperience: z.number().int().min(0).default(0),
    completedProjects: z.number().int().min(0).default(0),
    happyClients: z.number().int().min(0).default(0),
    githubUrl: z.string().optional().nullable(),
    linkedinUrl: z.string().optional().nullable(),
    twitterUrl: z.string().optional().nullable(),
    leetcodeUrl: z.string().optional().nullable(),
    isAvailable: z.boolean().default(true)
  })
});
