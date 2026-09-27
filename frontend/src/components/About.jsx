import React from 'react';
import { User, MapPin, Mail, Phone, Award, CheckCircle2, ShieldCheck, Zap, Server, Layout } from 'lucide-react';
import { TextSkeleton } from './Skeleton';

export const About = ({ about, loading }) => {
  if (loading) {
    return (
      <section id="about" className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md mx-auto mb-10 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            <TextSkeleton lines={8} />
          </div>
        </div>
      </section>
    );
  }

  const focusAreas = [
    {
      icon: Server,
      title: 'Scalable Backends',
      desc: 'Node.js, Express, Microservices, and high-concurrency API architectures.'
    },
    {
      icon: Layout,
      title: 'Modern Frontends',
      desc: 'Pixel-perfect, accessible, and reactive user interfaces built with React & Tailwind.'
    },
    {
      icon: Zap,
      title: 'Database & Performance',
      desc: 'PostgreSQL query optimization, Prisma migrations, and low-latency Redis caching.'
    },
    {
      icon: ShieldCheck,
      title: 'Security & DevOps',
      desc: 'JWT auth workflows, Docker containerization, CI/CD, and zero-trust cloud setups.'
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering High-Impact Digital Experiences
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Get to know my engineering philosophy, technical background, and approach to software craft.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Bio card with avatar & contact quick info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
              
              {/* Avatar with subtle gradient frame */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl mb-6">
                <img
                  src={about?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={about?.name || 'Vamsi Krishna'}
                  className="w-full h-full object-cover rounded-xl bg-slate-800"
                  loading="lazy"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {about?.name || 'Vamsi Krishna'}
              </h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 font-mono mt-1">
                {about?.title || 'Senior Full-Stack Engineer'}
              </p>

              {/* Quick Details Table */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-left text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {about?.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{about.location}</span>
                  </div>
                )}
                {about?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                    <a href={`mailto:${about.email}`} className="hover:text-indigo-500 transition-colors">
                      {about.email}
                    </a>
                  </div>
                )}
                {about?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{about.phone}</span>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right: Full Narrative & Focus Areas */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Story Paragraphs */}
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {about?.fullBio ? (
                about.fullBio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>
                  I am a passionate Full-Stack Engineer specializing in building scalable distributed backends, clean relational data models, and fluid frontend user interfaces.
                </p>
              )}
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {area.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
