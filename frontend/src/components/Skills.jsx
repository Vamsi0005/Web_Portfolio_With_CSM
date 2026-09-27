import React, { useState } from 'react';
import {
  Code2,
  FileCode2,
  Palette,
  Layers,
  Server,
  Network,
  Terminal,
  Cpu,
  Database,
  Zap,
  HardDrive,
  Box,
  Cloud,
  GitBranch,
  Activity,
  Check
} from 'lucide-react';
import { CardSkeleton } from './Skeleton';

const ICON_MAP = {
  Code2,
  FileCode2,
  Palette,
  Layers,
  Server,
  Network,
  Terminal,
  Cpu,
  Database,
  Zap,
  HardDrive,
  Box,
  Cloud,
  GitBranch,
  Activity
};

export const Skills = ({ skills = [], loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(skills.map((s) => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Tech Stack & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Technical Proficiency
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Modern tools, languages, and frameworks I leverage daily to engineer robust software solutions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-md mx-auto">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No skills found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => {
              const IconComponent = (skill.icon && ICON_MAP[skill.icon]) || Code2;
              return (
                <div
                  key={skill.id}
                  className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
