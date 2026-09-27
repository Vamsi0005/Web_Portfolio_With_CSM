import prisma from '../config/db.js';
import { slugify } from '../utils/slugify.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/response.js';

export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, tag, all } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const where = {};

    // For public website, only show published blogs unless 'all=true' with authenticated admin
    if (all !== 'true') {
      where.published = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (tag) {
      where.tags = { contains: tag, mode: 'insensitive' };
    }

    const [total, blogs] = await Promise.all([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' }
      })
    ]);

    return sendPaginated(res, blogs, total, page, limit, 'Blogs fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    const blog = await prisma.blog.findFirst({
      where: isUuid ? { id } : { slug: id }
    });

    if (!blog) {
      return sendError(res, 'Blog post not found', 404);
    }

    return sendSuccess(res, blog, 'Blog post fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, coverImage, tags, author, readTime, published } = req.body;

    let finalSlug = slug ? slugify(slug) : slugify(title);

    const existing = await prisma.blog.findUnique({
      where: { slug: finalSlug }
    });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Calculate approximate read time if not provided
    const words = (content || '').trim().split(/\s+/).length;
    const computedReadTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage,
        tags: tags || 'General',
        author: author || 'Vamsi',
        readTime: readTime || computedReadTime,
        published: published !== undefined ? published : true,
        publishedAt: new Date()
      }
    });

    return sendSuccess(res, blog, 'Blog post created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, tags, author, readTime, published } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (content !== undefined) {
      data.content = content;
      if (!readTime) {
        const words = content.trim().split(/\s+/).length;
        data.readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
      }
    }
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (tags !== undefined) data.tags = tags;
    if (author !== undefined) data.author = author;
    if (readTime !== undefined) data.readTime = readTime;
    if (published !== undefined) data.published = published;

    if (slug) {
      data.slug = slugify(slug);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data
    });

    return sendSuccess(res, blog, 'Blog post updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({
      where: { id }
    });

    return sendSuccess(res, null, 'Blog post deleted successfully');
  } catch (error) {
    next(error);
  }
};
