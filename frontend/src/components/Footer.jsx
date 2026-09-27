import React from 'react';
import { Sparkles, ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = ({ about }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {about?.name || 'Vamsi Krishna'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                © {currentYear} • Built with React, Node.js, PostgreSQL & Tailwind
              </p>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            {about?.githubUrl && (
              <a
                href={about.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {about?.linkedinUrl && (
              <a
                href={about.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {about?.twitterUrl && (
              <a
                href={about.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ml-2"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
