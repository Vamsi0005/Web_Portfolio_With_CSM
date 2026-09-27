import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getAbout = async (req, res, next) => {
  try {
    let about = await prisma.about.findFirst();

    if (!about) {
      // Create initial default about record if none exists
      about = await prisma.about.create({
        data: {
          name: 'Vamsi Krishna',
          title: 'Full Stack Engineer & Cloud Architect',
          shortBio: 'Passionate software developer specializing in building scalable web applications and intuitive digital experiences.',
          fullBio: 'I am a full-stack engineer with expertise in modern JavaScript frameworks, distributed backend architectures, and cloud services. I love transforming complex ideas into clean, fast, and accessible digital products.',
          email: 'vamsi@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA / Remote',
          yearsExperience: 5,
          completedProjects: 25,
          happyClients: 18,
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          twitterUrl: 'https://twitter.com',
          isAvailable: true
        }
      });
    }

    return sendSuccess(res, about, 'About details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    let existing = await prisma.about.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.about.update({
        where: { id: existing.id },
        data: req.body
      });
    } else {
      updated = await prisma.about.create({
        data: req.body
      });
    }

    return sendSuccess(res, updated, 'About details updated successfully');
  } catch (error) {
    next(error);
  }
};
