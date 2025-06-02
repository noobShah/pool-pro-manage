
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ThemeProvider } from '../contexts/ThemeContext';

export const Layout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900/50">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
