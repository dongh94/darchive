import { motion } from 'motion/react';
import { Moon, Sun, Search, Zap, User } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 md:px-12"
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          <div className="w-1.5 h-6 bg-google-blue rounded-full" />
          <div className="w-1.5 h-6 bg-google-red rounded-full" />
          <div className="w-1.5 h-6 bg-google-yellow rounded-full" />
          <div className="w-1.5 h-6 bg-google-green rounded-full" />
        </div>
        <span className="font-display font-semibold text-lg tracking-tight ml-2">D-Archive</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-70">
        <a href="#wedding" className="hover:opacity-100 transition-opacity">Wedding</a>
        <a href="#devlogs" className="hover:opacity-100 transition-opacity">DevLogs</a>
        <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>
        <a href="#timeline" className="hover:opacity-100 transition-opacity">Timeline</a>
        <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
          <Search size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="bg-primary text-[hsl(var(--background))] px-4 py-1.5 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Zap size={14} />
          Hire Me
        </button>
      </div>
    </motion.nav>
  );
}
