
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  LogIn,
  FolderOpen, 
  Users, 
  UserCheck, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  Waves,
  TrendingUp,
  Package
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Login', href: '/login', icon: LogIn },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Contractors', href: '/contractors', icon: UserCheck },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Accounts', href: '/accounts', icon: CreditCard },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Marketing', href: '/marketing', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Materials', href: '/materials', icon: Package },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700">
      <NavLink to={'/'}>
        <div className="flex items-center p-4">
        <img src="/logo.jpg" alt="Company Logo" className="h-6 w-6 md:h-8 md:w-8" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">
            AquaBuild
          </span>
        </div>
        </NavLink>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
