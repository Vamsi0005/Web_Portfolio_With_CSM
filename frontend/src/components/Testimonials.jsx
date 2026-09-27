import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { CardSkeleton } from './Skeleton';

export const Testimonials = ({ testimonials = [], loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
            Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client & Colleague Testimonials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Feedback from engineering leaders and startup founders I have collaborated with.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Background big quote watermark */}
            <Quote className="absolute right-6 bottom-6 w-32 h-32 text-indigo-500/5 dark:text-indigo-400/5 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic">
                "{current.content}"
              </p>

              {/* Author & Controls Row */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Author Details */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md">
                    <img
                      src={
                        current.clientAvatar ||
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={current.clientName}
                      className="w-full h-full object-cover rounded-full bg-slate-800"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {current.clientName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {current.clientRole} at <span className="font-semibold text-indigo-600 dark:text-indigo-400">{current.clientCompany}</span>
                    </p>
                  </div>
                </div>

                {/* Carousel Arrows */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={prev}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-1">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <button
                    onClick={next}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
