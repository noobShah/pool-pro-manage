
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

export const Layout = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="flex-1 p-2 md:p-6 bg-gray-50 dark:bg-gray-900/50">
              <div className="max-w-full">
                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
