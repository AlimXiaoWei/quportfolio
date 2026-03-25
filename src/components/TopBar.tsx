import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projects';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, setActiveTab }) => {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: true }) + ' ' + now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getPath = () => {
    if (activeTab === 'home') return <span className="text-qu-green">home</span>;
    if (activeTab === 'skills') return <span className="text-qu-green">skills</span>;
    if (activeTab === 'experience') return <span className="text-qu-green">experience</span>;
    
    const project = projectsData[activeTab];
    if (project) {
      const isSystem = project.type === 'sys';
      return (
        <>
          <span className="text-text-muted">{isSystem ? 'system/' : 'projects/'}</span>
          <span className={isSystem ? 'text-qu-green' : 'text-qu-cyan'}>{project.name}</span>
        </>
      );
    }
    return <span className="text-qu-green">{activeTab}</span>;
  };

  return (
    <header className="h-12 border-b border-bg-panel bg-bg-base flex items-center justify-between px-4 text-sm shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-qu-purple font-bold tracking-widest">
          <span className="text-qu-cyan">QU</span> | ~/alimzhan/portfolio/{getPath()}
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex bg-bg-panel border border-bg-panel rounded-sm overflow-hidden">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1 transition-colors ${activeTab === 'home' ? 'bg-qu-purple/20 text-qu-cyan border-b-2 border-qu-cyan' : 'text-text-muted hover:text-text-primary'}`}
          >
            cd ~/home
          </button>
          <button className="px-4 py-1 text-text-muted hover:text-text-primary transition-colors">ls ~/projects</button>
          <button className="px-4 py-1 text-text-muted hover:text-text-primary transition-colors">cat experience.log</button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-text-muted text-xs">
        <div className="flex gap-2 hidden md:flex">
          <span>UPTIME:</span>
          <span className="text-qu-cyan">{formatUptime(uptime)}</span>
        </div>
        <div className="hidden md:block">
          {time}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-qu-green animate-pulse" />
          <span className="text-qu-green">ONLINE</span>
        </div>
      </div>
    </header>
  );
};
