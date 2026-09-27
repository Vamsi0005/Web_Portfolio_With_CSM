import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, BookOpen, CheckCircle2 } from 'lucide-react';
import { getBlogById } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TextSkeleton } from '../components/Skeleton';
import { Toast } from '../components/Toast';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await getBlogById(slug);
        if (response.data) {
          setBlog(response.data);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
    }
  };

  const formattedDate = blog?.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  const tagsList = blog?.tags ? blog.tags.split(',').map((t) => t.trim()) : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#0a0d14] dark:text-slate-100 transition-colors">
      <Navbar />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-8">
            <Link
              to="/#blogs"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-6">
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
              <TextSkeleton lines={12} />
            </div>
          ) : error || !blog ? (
            <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h2 className="text-2xl font-bold">Post Not Found</h2>
              <p className="text-slate-500 text-sm">
                The article you are looking for might have been moved or unpublished.
              </p>
              <Link
                to="/"
                className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <article className="space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    {blog.readTime || '5 min read'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    {blog.author || 'Vamsi Krishna'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {blog.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {blog.excerpt}
                </p>

                {/* Tags and Share Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {tagsList.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-800/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Post</span>
                  </button>
                </div>
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content Rendered */}
              <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-lg text-slate-800 dark:text-slate-200 space-y-6 leading-relaxed text-base sm:text-lg">
                {blog.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('# ')) {
                    return (
                      <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                        {block.replace('# ', '')}
                      </h2>
                    );
                  }
                  if (block.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-3">
                        {block.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (block.startsWith('```')) {
                    const code = block.replace(/```[a-z]*\n?/gi, '').replace(/```$/g, '');
                    return (
                      <pre key={idx} className="p-5 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  if (block.startsWith('- ')) {
                    const items = block.split('\n').map((line) => line.replace('- ', ''));
                    return (
                      <ul key={idx} className="space-y-2 list-disc list-inside">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx}>{block}</p>;
                })}
              </div>

              {/* Author Bio Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shrink-0 shadow-md">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                    VK
                  </div>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Written by {blog.author || 'Vamsi Krishna'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Senior Full-Stack Engineer & Cloud Architect. Writing practical guides on backend scaling, PostgreSQL optimizations, and modern web application architecture.
                  </p>
                </div>
              </div>

            </article>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};
