import React, { useState } from 'react';
import { projectsList, systemComponentsList } from '../data/projects';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedProjects, setExpandedProjects] = useState(true);
  const [expandedSystem, setExpandedSystem] = useState(true);

  return (
    <aside className="w-64 border-r border-bg-panel bg-bg-base flex flex-col shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-bg-panel text-xs text-text-muted tracking-widest uppercase">
        Explorer
      </div>
      
      <div className="p-2">
        <div 
          className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-bg-panel rounded text-sm text-text-primary"
          onClick={() => setExpandedProjects(!expandedProjects)}
        >
          <span className="text-qu-cyan">{expandedProjects ? '▼' : '▶'}</span>
          <span className="font-bold">~/projects</span>
        </div>
        
        {expandedProjects && (
          <div className="ml-4 mt-1 flex flex-col gap-1">
            {projectsList.map((project) => (
              <div 
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors ${
                  activeTab === project.id 
                    ? 'bg-qu-purple/20 text-qu-cyan border-l-2 border-qu-cyan' 
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'
                }`}
              >
                <span className="text-qu-purple">📁</span>
                <span>{project.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2">
        <div 
          className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-bg-panel rounded text-sm text-text-primary"
          onClick={() => setExpandedSystem(!expandedSystem)}
        >
          <span className="text-qu-cyan">{expandedSystem ? '▼' : '▶'}</span>
          <span className="font-bold">~/system</span>
        </div>
        
        {expandedSystem && (
          <div className="ml-4 mt-1 flex flex-col gap-1">
            {systemComponentsList.map((project) => (
              <div 
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors ${
                  activeTab === project.id 
                    ? 'bg-qu-green/20 text-qu-green border-l-2 border-qu-green' 
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'
                }`}
              >
                <span className="text-qu-green">⚙️</span>
                <span>{project.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 mt-4">
        <div 
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors ${
            activeTab === 'home' 
              ? 'bg-qu-purple/20 text-qu-cyan border-l-2 border-qu-cyan' 
              : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'
          }`}
          onClick={() => setActiveTab('home')}
        >
          <span className="text-qu-cyan">▶</span>
          <span className="font-bold">~/home</span>
        </div>
      </div>
      <div className="p-2">
        <div 
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors ${
            activeTab === 'skills' 
              ? 'bg-qu-purple/20 text-qu-cyan border-l-2 border-qu-cyan' 
              : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          <span className="text-qu-cyan">▶</span>
          <span className="font-bold">~/skills</span>
        </div>
      </div>
      <div className="p-2">
        <div 
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm transition-colors ${
            activeTab === 'experience' 
              ? 'bg-qu-purple/20 text-qu-cyan border-l-2 border-qu-cyan' 
              : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'
          }`}
          onClick={() => setActiveTab('experience')}
        >
          <span className="text-qu-cyan">▶</span>
          <span className="font-bold">~/experience</span>
        </div>
      </div>
    </aside>
  );
};
