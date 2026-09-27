import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#0a0d14] dark:text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full glass-panel p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Page Not Found</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The page or resource you requested could not be located in the portfolio route tree.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
