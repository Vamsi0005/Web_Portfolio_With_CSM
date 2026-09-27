import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const getProjects = async (req, res, next) => {
  try {
    const { featured, search } = req.query;

    const where = {};
    if (featured !== undefined) {
      where.featured = featured === 'true';
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { technologies: { contains: search, mode: 'insensitive' } }
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return sendSuccess(res, projects, 'Projects fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Support both ID and slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    const project = await prisma.project.findFirst({
      where: isUuid ? { id } : { slug: id }
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, project, 'Project details fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, slug, summary, description, coverImage, technologies, liveUrl, githubUrl, featured, order } = req.body;

    let finalSlug = slug ? slugify(slug) : slugify(title);

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: finalSlug }
    });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug: finalSlug,
        summary,
        description,
        coverImage,
        technologies,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: featured || false,
        order: order || 0
      }
    });

    return sendSuccess(res, project, 'Project created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, summary, description, coverImage, technologies, liveUrl, githubUrl, featured, order } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (summary !== undefined) data.summary = summary;
    if (description !== undefined) data.description = description;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (technologies !== undefined) data.technologies = technologies;
    if (liveUrl !== undefined) data.liveUrl = liveUrl || null;
    if (githubUrl !== undefined) data.githubUrl = githubUrl || null;
    if (featured !== undefined) data.featured = featured;
    if (order !== undefined) data.order = order;

    if (slug) {
      data.slug = slugify(slug);
    } else if (title && !slug) {
      // Keep existing slug or update if specified
    }

    const project = await prisma.project.update({
      where: { id },
      data
    });

    return sendSuccess(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};
