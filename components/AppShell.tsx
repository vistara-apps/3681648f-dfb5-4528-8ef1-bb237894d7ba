'use client';

import { ReactNode } from 'react';
import { TrendingUp, Bell, Settings2, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="floating-element top-20 left-10 w-16 h-16 bg-purple-500 rounded-lg rotate-12"></div>
      <div className="floating-element top-40 right-20 w-12 h-12 bg-blue-500 rounded-full"></div>
      <div className="floating-element bottom-32 left-1/4 w-20 h-20 bg-indigo-500 rounded-lg -rotate-12"></div>
      <div className="floating-element top-1/3 right-1/3 w-8 h-8 bg-cyan-400 rounded-full"></div>
      
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Fundamenta</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 glass-card rounded-lg hover:bg-opacity-20 transition-all duration-200">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 glass-card rounded-lg hover:bg-opacity-20 transition-all duration-200">
            <Settings2 className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 glass-card rounded-lg hover:bg-opacity-20 transition-all duration-200">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 glass-card p-4">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 text-white hover:text-purple-300 transition-colors duration-200">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">News</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white hover:text-purple-300 transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white hover:text-purple-300 transition-colors duration-200">
            <User className="w-5 h-5" />
            <span className="text-xs">Portfolio</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-white hover:text-purple-300 transition-colors duration-200">
            <Settings2 className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
