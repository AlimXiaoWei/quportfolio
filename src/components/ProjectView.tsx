import React from 'react';
import { projectsData } from '../data/projects';

interface ProjectViewProps {
  projectId: string;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ projectId }) => {
  const project = projectsData[projectId];

  if (!project) return <div className="text-qu-pink">Error: Project not found.</div>;

  const isSystem = project.type === 'sys';
  const pathPrefix = isSystem ? '~/system' : '~/projects';
  const accentColor = isSystem ? 'text-qu-green' : 'text-qu-cyan';
  const accentBorder = isSystem ? 'border-qu-green/30' : 'border-qu-cyan/30';
  const accentBg = isSystem ? 'bg-qu-green/10' : 'bg-qu-cyan/10';

  return (
    <div className="flex flex-col gap-6 p-4 h-full">
      <div className="flex-1 bg-bg-base border border-bg-panel rounded-md overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Header */}
        <div className="h-8 bg-bg-panel flex items-center px-4 gap-2 border-b border-bg-panel shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-qu-pink"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-qu-green"></div>
          </div>
          <div className="flex-1 text-center text-xs text-text-muted font-mono tracking-widest">
            {project.name} - vim - 132x40
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-4 md:p-6 font-mono text-sm flex flex-col gap-4 overflow-y-auto">
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <span className="text-qu-purple font-bold shrink-0">root@qu:{pathPrefix}/{project.name}$</span>
            <span className="text-text-primary">cat README.md</span>
          </div>

          <div className="border border-bg-panel bg-bg-panel/30 p-3 md:p-4 rounded-sm mt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h1 className={`text-xl md:text-2xl font-display ${accentColor} uppercase tracking-wider leading-tight`}>
                # {project.name.replace('_', ' ')}
              </h1>
              {project.status && (
                <span className="text-[10px] md:text-xs font-bold text-qu-green border border-qu-green/30 px-2 py-1 rounded-sm bg-qu-green/10 shrink-0">
                  {project.status}
                </span>
              )}
            </div>
            <p className="text-text-primary mb-4 text-base md:text-lg leading-relaxed">
              {project.description}
            </p>
            
            <div className="mb-6">
              <h2 className="text-qu-purple font-bold mb-2 text-xs md:text-sm uppercase">## DETAILS</h2>
              <p className="text-text-muted leading-relaxed text-sm md:text-base">
                {project.details}
              </p>
            </div>

            {project.role && (
              <div className="mb-6">
                <h2 className="text-qu-purple font-bold mb-2 text-xs md:text-sm uppercase">## ROLE</h2>
                <p className="text-text-primary text-sm md:text-base">
                  {project.role}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-qu-purple font-bold mb-2 text-xs md:text-sm uppercase">## TECH_STACK</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className={`px-2 py-1 ${accentBg} ${accentColor} border ${accentBorder} rounded-sm text-[10px] md:text-xs`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.metrics && project.metrics.length > 0 && project.metrics[0] !== '[Awaiting data]' && (
              <div className="mb-6">
                <h2 className="text-qu-purple font-bold mb-2 text-xs md:text-sm uppercase">## METRICS_&_IMPACT</h2>
                <ul className="list-none flex flex-col gap-2">
                  {project.metrics.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                      <span className="text-qu-green mt-0.5 shrink-0">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {project.logs && project.logs.length > 0 && (
            <>
              <div className="flex gap-2 mt-4 flex-wrap sm:flex-nowrap">
                <span className="text-qu-purple font-bold shrink-0">root@qu:{pathPrefix}/{project.name}$</span>
                <span className="text-text-primary">tail -f system.log</span>
              </div>
              <div className="bg-black/50 border border-bg-panel p-3 md:p-4 rounded-sm font-mono text-[10px] md:text-xs flex flex-col gap-2 overflow-x-auto">
                {project.logs.map((log, i) => {
                  let logColor = "text-text-muted";
                  if (log.includes('[DEPRECATED]') || log.includes('[ERROR]')) logColor = "text-qu-pink";
                  else if (log.includes('[STATUS]') || log.includes('[METRIC]') || log.includes('[DB_UPDATE]')) logColor = "text-qu-green";
                  else if (log.includes('[INFO]') || log.includes('[SCANNING]')) logColor = "text-qu-cyan";
                  else if (log.startsWith('>')) logColor = "text-yellow-500";
                  
                  return (
                    <div key={i} className={`${logColor} whitespace-nowrap sm:whitespace-normal`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex gap-2 animate-pulse mt-4">
            <span className="text-qu-purple font-bold shrink-0">root@qu:{pathPrefix}/{project.name}$</span>
            <span className="w-2 h-4 bg-text-primary inline-block shrink-0"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
