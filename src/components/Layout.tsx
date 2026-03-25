import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusBar } from './StatusBar';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen bg-bg-base text-text-primary font-mono overflow-hidden">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-bg-base relative">
          {/* Grid background pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'linear-gradient(var(--color-bg-panel) 1px, transparent 1px), linear-gradient(90deg, var(--color-bg-panel) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
      <StatusBar />
    </div>
  );
};
