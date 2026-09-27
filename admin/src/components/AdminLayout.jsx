import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { getMessages } from '../services/api';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getMessages({ isRead: false, limit: 1 });
        if (res.meta?.unreadCount !== undefined) {
          setUnreadCount(res.meta.unreadCount);
        }
      } catch (e) {
        // Silently fail badge update
      }
    };

    fetchUnread();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadMessages={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
