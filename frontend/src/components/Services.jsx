import React from 'react';
import { Layout, Sliders, Cpu, CloudLightning, Check, Sparkles } from 'lucide-react';
import { CardSkeleton } from './Skeleton';

const SERVICE_ICONS = {
  Layout,
  Sliders,
  Cpu,
  CloudLightning
};

export const Services = ({ services = [], loading }) => {
  return (
    <section id="services" className="py-20 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            What I Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consulting & Engineering Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Delivering robust, end-to-end digital solutions tailored for startups and scaling enterprise teams.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl max-w-md mx-auto">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No services listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => {
              const IconComponent = (svc.icon && SERVICE_ICONS[svc.icon]) || Sparkles;
              const features = svc.features ? svc.features.split(',').map((f) => f.trim()) : [];

              return (
                <div
                  key={svc.id}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:translate-y-[-4px] shadow-lg hover:shadow-2xl flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {svc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {features.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
