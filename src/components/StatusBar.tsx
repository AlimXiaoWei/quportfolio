import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <footer className="h-8 border-t border-bg-panel bg-bg-base flex items-center justify-between px-4 text-xs shrink-0 text-text-muted">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-qu-cyan">
          <span className="text-qu-purple">~</span> main
        </div>
        <span>v2.5.1-stable</span>
        <div className="flex items-center gap-1 text-qu-green">
          <span>✓</span> 0 errors
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <span>⚠</span> 2 warnings
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>UTF-8</span>
        <span>UNIX (LF)</span>
        <span>Python 3.11.4</span>
        <div className="flex items-center gap-2">
          <span>CPU: <span className="text-qu-cyan">10%</span></span>
          <span>MEM: <span className="text-qu-cyan">62%</span></span>
        </div>
        <span className="text-qu-purple">root@qu-system</span>
      </div>
    </footer>
  );
};
