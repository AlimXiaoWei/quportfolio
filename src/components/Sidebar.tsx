import React, { useState } from 'react';
import { projectsList, systemComponentsList } from '../data/projects';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedProjects, setExpandedProjects] = useState(true);
  const [expandedSystem, setExpandedSystem] = useState(true);

  const itemClasses = (id: string, color: string) => `
    flex items-center gap-3 px-3 py-2 md:py-1 cursor-pointer rounded text-sm transition-colors 
    ${activeTab === id 
      ? `bg-${color}/20 text-qu-cyan border-l-2 border-qu-cyan` 
      : 'text-text-muted hover:text-text-primary hover:bg-bg-panel border-l-2 border-transparent'}
  `;

  return (
    <aside className="w-64 border-r border-bg-panel bg-bg-base flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-bg-panel text-xs text-text-muted tracking-widest uppercase flex justify-between items-center">
        <span>Explorer</span>
        <span className="text-[10px] opacity-50">root@qu</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div 
            className="flex items-center gap-2 px-2 py-2 md:py-1 cursor-pointer hover:bg-bg-panel rounded text-sm text-text-primary"
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
                  className={itemClasses(project.id, 'qu-purple')}
                >
                  <span className="text-qu-purple text-base">📁</span>
                  <span>{project.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-2">
          <div 
            className="flex items-center gap-2 px-2 py-2 md:py-1 cursor-pointer hover:bg-bg-panel rounded text-sm text-text-primary"
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
                  className={itemClasses(project.id, 'qu-green')}
                >
                  <span className="text-qu-green text-base">⚙️</span>
                  <span>{project.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-2 border-t border-bg-panel mt-2 pt-4">
          <div 
            className={itemClasses('home', 'qu-purple')}
            onClick={() => setActiveTab('home')}
          >
            <span className="text-qu-cyan text-xs">▶</span>
            <span className="font-bold">~/home</span>
          </div>
          
          <div 
            className={itemClasses('skills', 'qu-purple')}
            onClick={() => setActiveTab('skills')}
          >
            <span className="text-qu-cyan text-xs">▶</span>
            <span className="font-bold">~/skills</span>
          </div>
          
          <div 
            className={itemClasses('experience', 'qu-purple')}
            onClick={() => setActiveTab('experience')}
          >
            <span className="text-qu-cyan text-xs">▶</span>
            <span className="font-bold">~/experience</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
