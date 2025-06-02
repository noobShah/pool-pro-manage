
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          <Sidebar />
          <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : ''}`}>
            <Header />
            <main className={`flex-1 p-3 md:p-6 bg-gray-50 dark:bg-gray-900/50 ${isMobile ? 'pt-20' : ''}`}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
