'use client';

import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? `Ganti ke tema ${theme === 'dark' ? 'terang' : 'gelap'}`
          : 'Ganti tema gelap atau terang'
      }
      title={
        mounted
          ? `Ganti ke mode ${theme === 'dark' ? 'Light' : 'Dark'}`
          : 'Ganti tema'
      }
      className={`inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-600 shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {mounted && theme === 'dark' ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 text-slate-600 transition-transform duration-300 rotate-0 scale-100 dark:text-slate-300" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-medium">
          {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
