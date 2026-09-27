import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Cover Image */}
        {project.coverImage && (
          <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-slate-800 border border-slate-200 dark:border-slate-800">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header & Badges */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Project
              </span>
            )}
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
              Architecture & Case Study
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {project.title}
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {project.summary}
          </p>
        </div>

        {/* Technologies List */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Technologies & Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {techList.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full Detailed Description */}
        <div className="mb-8 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Detailed Overview
          </h4>
          <p className="whitespace-pre-line">{project.description}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
