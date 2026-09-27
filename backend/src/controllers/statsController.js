import prisma from '../config/db.js';
import { sendSuccess } from '../utils/response.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalBlogs,
      publishedBlogs,
      totalSkills,
      totalTestimonials,
      totalServices,
      totalExperience,
      totalMessages,
      unreadMessages,
      totalMedia,
      recentMessages,
      recentProjects,
      recentBlogs
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { published: true } }),
      prisma.skill.count(),
      prisma.testimonial.count(),
      prisma.service.count(),
      prisma.experience.count(),
      prisma.message.count(),
      prisma.message.count({ where: { isRead: false } }),
      prisma.media.count(),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.project.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blog.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return sendSuccess(
      res,
      {
        counts: {
          projects: totalProjects,
          featuredProjects,
          blogs: totalBlogs,
          publishedBlogs,
          skills: totalSkills,
          testimonials: totalTestimonials,
          services: totalServices,
          experience: totalExperience,
          messages: totalMessages,
          unreadMessages,
          media: totalMedia
        },
        recentMessages,
        recentProjects,
        recentBlogs
      },
      'Dashboard statistics fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};
