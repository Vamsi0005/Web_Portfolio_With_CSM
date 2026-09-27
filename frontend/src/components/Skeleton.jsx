import React from 'react';

export const CardSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl animate-pulse space-y-4">
    <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      <div className="h-6 w-14 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
    </div>
  </div>
);

export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-slate-200 dark:bg-slate-800 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);
