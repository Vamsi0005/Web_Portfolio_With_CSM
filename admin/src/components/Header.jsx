import React from 'react';
import { Menu, ExternalLink, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Header = ({ onOpenSidebar, unreadCount = 0 }) => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="h-16 px-4 sm:px-8 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
          CMS Control Center
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* View Portfolio Live */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Site</span>
        </a>

        {/* Notifications / Messages link */}
        <Link
          to="/admin/messages"
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Inquiries"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          )}
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-xs font-bold">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden md:inline-block">
            {user?.name || 'Administrator'}
          </span>
        </div>
      </div>
    </header>
  );
};
