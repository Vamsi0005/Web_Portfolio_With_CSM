import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Zap,
  FolderGit2,
  BookOpen,
  Briefcase,
  Quote,
  Layout,
  Image,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose, unreadMessages = 0 }) => {
  const { logoutUser, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'About Info', path: '/admin/about', icon: User },
    { name: 'Skills & Tech', path: '/admin/skills', icon: Zap },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Blog Articles', path: '/admin/blogs', icon: BookOpen },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { name: 'Services', path: '/admin/services', icon: Layout },
    { name: 'Media Library', path: '/admin/media', icon: Image },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: Mail,
      badge: unreadMessages > 0 ? unreadMessages : null
    },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">Portfolio CMS</span>
              <span className="text-[10px] font-mono text-indigo-400 block -mt-1">Admin Studio</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Footer and Links */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          {/* Live Portfolio Preview Link */}
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700/60"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Portfolio</span>
          </a>

          {/* User profile & Logout */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@portfolio.local'}</p>
              </div>
            </div>
            <button
              onClick={logoutUser}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
