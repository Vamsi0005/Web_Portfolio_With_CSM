import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { CardSkeleton } from './Skeleton';
import { ProjectModal } from './ProjectModal';

export const Projects = ({ projects = [], loading }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects;

  return (
    <section id="projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Selected Software Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              A collection of full-stack web applications, microservices, and distributed cloud tools.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-2 bg-slate-200/60 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-300/40 dark:border-slate-700/40 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'featured'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Featured Only ({projects.filter((p) => p.featured).length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl max-w-md mx-auto space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-slate-600 dark:text-slate-300 font-medium">No projects found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const techList = project.technologies
                ? project.technologies.split(',').map((t) => t.trim())
                : [];

              return (
                <div
                  key={project.id}
                  className="glass-panel rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:translate-y-[-4px] group flex flex-col shadow-lg hover:shadow-2xl"
                >
                  {/* Cover Image */}
                  <div
                    className="relative w-full h-52 bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={
                        project.coverImage ||
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-slate-950 backdrop-blur-md shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        Featured
                      </div>
                    )}

                    {/* Quick view overlay icon */}
                    <div className="absolute bottom-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {techList.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-300">
                          +{techList.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer Action Buttons */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Case Study & Details
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                            aria-label="GitHub repo"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors"
                            aria-label="Live Demo"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal View */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  );
};
