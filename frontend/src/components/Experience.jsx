import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { CardSkeleton } from './Skeleton';

export const Experience = ({ experiences = [], loading }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Track record of shipping mission-critical systems and leading high-performing engineering teams.
          </p>
        </div>

        {/* Timeline Layout */}
        {loading ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-md mx-auto">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No experience records available.</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"></div>

            <div className="space-y-8">
              {experiences.map((exp, idx) => {
                let achievements = [];
                if (exp.achievements) {
                  try {
                    achievements = JSON.parse(exp.achievements);
                  } catch (e) {
                    achievements = exp.achievements.split('\n').filter(Boolean);
                  }
                }

                const techList = exp.technologies
                  ? exp.technologies.split(',').map((t) => t.trim())
                  : [];

                return (
                  <div key={exp.id || idx} className="relative sm:pl-20 group">
                    {/* Timeline icon node */}
                    <div className="hidden sm:flex absolute left-3.5 top-5 w-9 h-9 rounded-full bg-slate-900 border-2 border-indigo-500 text-indigo-400 items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-500/20 z-10">
                      <Briefcase className="w-4 h-4" />
                    </div>

                    {/* Timeline card */}
                    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-md hover:shadow-xl space-y-4">
                      
                      {/* Header info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {exp.role}
                            </h3>
                            {exp.isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                Current Role
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                            <Building2 className="w-4 h-4" />
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {exp.company}
                              </a>
                            ) : (
                              <span>{exp.company}</span>
                            )}
                            {exp.type && <span className="text-slate-600 dark:text-slate-300 font-normal">({exp.type})</span>}
                          </div>
                        </div>

                        {/* Date and Location */}
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300 sm:text-right">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key achievements list */}
                      {Array.isArray(achievements) && achievements.length > 0 && (
                        <div className="space-y-2 pt-2">
                          {achievements.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies pills */}
                      {techList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                          {techList.map((t, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
