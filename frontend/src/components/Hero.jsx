import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Sparkles, Terminal, Code2, Database, Cloud } from 'lucide-react';

export const Hero = ({ about }) => {
  const roles = [
    'Senior Full-Stack Engineer',
    'Distributed Systems Builder',
    'PostgreSQL & Cloud Architect',
    'React & Node.js Specialist'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const name = about?.name || 'Vamsi Krishna';
  const shortBio = about?.shortBio || 'Crafting high-performance web applications, scalable distributed backends, and elegant developer tools with modern web technologies.';

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glowing mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-To-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Available for Full-time Roles & Contracts</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="gradient-text">{name}</span>
              </h1>
              
              {/* Animated Typing Role */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200 font-mono">
                  {displayText}
                  <span className="animate-pulse text-indigo-500 font-bold ml-0.5">|</span>
                </span>
              </div>
            </div>

            {/* Short Elevator Pitch */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {shortBio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('#projects')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700/90 border border-slate-200 dark:border-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Get in Touch</span>
              </button>

              {about?.resumeUrl && about.resumeUrl !== '#' && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">Connect:</span>
              {about?.githubUrl && (
                <a
                  href={about.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {about?.linkedinUrl && (
                <a
                  href={about.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {about?.twitterUrl && (
                <a
                  href={about.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {about?.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  aria-label="Email Me"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Interactive Code & Architecture Terminal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-panel rounded-2xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative group animate-float">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>vamsi@architect-node</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300">ES6</div>
              </div>

              {/* Code Snippet */}
              <div className="font-mono text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p className="text-slate-600 dark:text-slate-300">// Developer Profile & Core Stack</p>
                <p>
                  <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
                  <span className="text-indigo-600 dark:text-indigo-300">developer</span> = &#123;
                </p>
                <p className="pl-4">
                  <span className="text-sky-600 dark:text-sky-300">name:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-300">'{name}'</span>,
                </p>
                <p className="pl-4">
                  <span className="text-sky-600 dark:text-sky-300">stack:</span> [
                  <span className="text-emerald-600 dark:text-emerald-300">'React'</span>,{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">'Node'</span>,{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">'Postgres'</span>],
                </p>
                <p className="pl-4">
                  <span className="text-sky-600 dark:text-sky-300">architecture:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-300">'Microservices & Cloud'</span>,
                </p>
                <p className="pl-4">
                  <span className="text-sky-600 dark:text-sky-300">yearsExp:</span>{' '}
                  <span className="text-pink-600 dark:text-pink-400">{about?.yearsExperience || 5}</span>,
                </p>
                <p className="pl-4">
                  <span className="text-sky-600 dark:text-sky-300">passion:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-300">'Ship robust products'</span>
                </p>
                <p>&#125;;</p>
              </div>

              {/* Stat Highlights Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-100 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {about?.yearsExperience || 5}+
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 uppercase tracking-wider font-medium">Years Exp</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">
                    {about?.completedProjects || 25}+
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 uppercase tracking-wider font-medium">Projects</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <div className="text-lg font-bold text-pink-600 dark:text-pink-400 font-mono">
                    100%
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 uppercase tracking-wider font-medium">Commitment</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
