export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 scale-75">
            <div className="w-1.5 h-6 bg-google-blue rounded-full" />
            <div className="w-1.5 h-6 bg-google-red rounded-full" />
            <div className="w-1.5 h-6 bg-google-yellow rounded-full" />
            <div className="w-1.5 h-6 bg-google-green rounded-full" />
          </div>
          <p className="text-sm font-medium opacity-50">© 2026 D-Archive. All rights recorded.</p>
        </div>

        <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest opacity-40">
          <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
          <a href="#" className="hover:opacity-100 transition-opacity">GitHub</a>
          <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Medium</a>
        </div>

        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-google-green rounded-full pulse-slow" />
           <span className="text-xs font-medium opacity-40">Status: Living.</span>
        </div>
      </div>
      
      <style>{`
        .pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .3; }
        }
      `}</style>
    </footer>
  );
}
