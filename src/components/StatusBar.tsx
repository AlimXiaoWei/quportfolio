import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <footer className="h-6 sm:h-8 border-t border-bg-panel bg-bg-base flex items-center justify-between px-4 text-[10px] sm:text-xs shrink-0 text-text-muted">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-qu-cyan">
          <span className="text-qu-purple">~</span> main
        </div>
        <span className="hidden xs:inline">v2.5.1</span>
        <div className="flex items-center gap-1 text-qu-green">
          <span>✓</span> <span className="hidden xs:inline">0 errors</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <span>⚠</span> <span className="hidden xs:inline">2 warnings</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 hidden md:flex">
        <span>UTF-8</span>
        <span>UNIX (LF)</span>
        <span>Python 3.11</span>
        <div className="flex items-center gap-2">
          <span>CPU: <span className="text-qu-cyan">10%</span></span>
          <span>MEM: <span className="text-qu-cyan">62%</span></span>
        </div>
        <span className="text-qu-purple">root@qu</span>
      </div>
    </footer>
  );
};
