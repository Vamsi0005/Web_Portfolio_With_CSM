import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  BookOpen,
  Zap,
  Mail,
  Image,
  Briefcase,
  Quote,
  Layout,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Loader2
} from 'lucide-react';
import { getDashboardStats, markMessageRead } from '../services/api';
import { Toast } from '../components/Toast';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      if (res.data) setStats(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickMarkRead = async (id) => {
    try {
      await markMessageRead(id, true);
      setToast({ message: 'Message marked as read', type: 'success' });
      fetchStats();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-indigo-400">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const counts = stats?.counts || {};
  const recentMessages = stats?.recentMessages || [];
  const recentProjects = stats?.recentProjects || [];
  const recentBlogs = stats?.recentBlogs || [];

  const statCards = [
    {
      title: 'Projects',
      count: counts.projects || 0,
      sub: `${counts.featuredProjects || 0} featured`,
      icon: FolderGit2,
      color: 'from-blue-600 to-indigo-600',
      link: '/admin/projects'
    },
    {
      title: 'Blog Posts',
      count: counts.blogs || 0,
      sub: `${counts.publishedBlogs || 0} published`,
      icon: BookOpen,
      color: 'from-purple-600 to-pink-600',
      link: '/admin/blogs'
    },
    {
      title: 'Skills & Tech',
      count: counts.skills || 0,
      sub: 'Categorized',
      icon: Zap,
      color: 'from-amber-600 to-orange-600',
      link: '/admin/skills'
    },
    {
      title: 'Inquiries',
      count: counts.messages || 0,
      sub: `${counts.unreadMessages || 0} unread`,
      icon: Mail,
      color: 'from-emerald-600 to-teal-600',
      link: '/admin/messages',
      badge: counts.unreadMessages > 0 ? `${counts.unreadMessages} New` : null
    },
    {
      title: 'Work History',
      count: counts.experience || 0,
      sub: 'Timeline records',
      icon: Briefcase,
      color: 'from-cyan-600 to-blue-600',
      link: '/admin/experience'
    },
    {
      title: 'Testimonials',
      count: counts.testimonials || 0,
      sub: 'Client quotes',
      icon: Quote,
      color: 'from-rose-600 to-pink-600',
      link: '/admin/testimonials'
    },
    {
      title: 'Services',
      count: counts.services || 0,
      sub: 'Core offerings',
      icon: Layout,
      color: 'from-indigo-600 to-violet-600',
      link: '/admin/services'
    },
    {
      title: 'Media Files',
      count: counts.media || 0,
      sub: 'Uploaded assets',
      icon: Image,
      color: 'from-slate-600 to-slate-700',
      link: '/admin/media'
    }
  ];

  return (
    <div className="space-y-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            CMS Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry, portfolio content statistics, and recent client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/admin/projects"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write Post</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all hover:translate-y-[-2px] shadow-lg group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {card.count}
                </span>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{card.title}</p>
                <p className="text-[11px] text-slate-500">{card.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Messages & Quick Content Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Recent Contact Inquiries</h2>
            </div>
            <Link to="/admin/messages" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    msg.isRead
                      ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      : 'bg-indigo-950/20 border-indigo-500/30 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">{msg.name}</span>
                        <span className="text-xs text-slate-500">&lt;{msg.email}&gt;</span>
                        {!msg.isRead && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-indigo-300 mt-1">{msg.subject}</p>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleQuickMarkRead(msg.id)}
                          className="p-1.5 text-xs text-indigo-400 hover:text-white hover:bg-indigo-600/30 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Projects & Blogs Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recent Projects */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-bold text-white">Recent Projects</h2>
              </div>
              <Link to="/admin/projects" className="text-xs font-semibold text-purple-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold text-white truncate">{p.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{p.technologies}</p>
                  </div>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-400" />
                <h2 className="text-base font-bold text-white">Latest Articles</h2>
              </div>
              <Link to="/admin/blogs" className="text-xs font-semibold text-pink-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentBlogs.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold text-white truncate">{b.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{b.readTime || '5 min read'}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    b.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {b.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
