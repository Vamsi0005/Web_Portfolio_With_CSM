import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { CardSkeleton } from './Skeleton';

export const BlogSection = ({ blogs = [], loading }) => {
  return (
    <section id="blogs" className="py-20 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Technical Writing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Latest Articles & Engineering Notes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Deep dives into distributed systems, database scaling, frontend patterns, and software architecture.
          </p>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">No blog posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const tagsList = blog.tags
                ? blog.tags.split(',').map((t) => t.trim())
                : [];

              const formattedDate = new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <article
                  key={blog.id}
                  className="glass-panel rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:translate-y-[-4px] shadow-lg hover:shadow-2xl flex flex-col justify-between group"
                >
                  {/* Cover Image */}
                  <Link
                    to={`/blog/${blog.slug || blog.id}`}
                    className="relative w-full h-48 bg-slate-900 overflow-hidden block"
                  >
                    <img
                      src={
                        blog.coverImage ||
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta info: Date & Read Time */}
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          {blog.readTime || '5 min read'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                        <Link to={`/blog/${blog.slug || blog.id}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Tags & Action Link */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {tagsList.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/blog/${blog.slug || blog.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read Post</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
