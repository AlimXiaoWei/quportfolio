import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusBar } from './StatusBar';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when a tab is selected
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base text-text-primary font-mono overflow-hidden">
      <TopBar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay for mobile */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        <div className={`
          fixed z-50 transition-transform duration-300 transform 
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 md:transform-none md:z-auto h-full overflow-y-auto
        `}>
          <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

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
