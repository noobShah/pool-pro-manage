
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn,
  FolderOpen, 
  Users, 
  UserCheck, 
  FileText, 
  CreditCard, 
  BarChart3, 
  TrendingUp,
  Settings,
  Package,
  Waves
} from 'lucide-react';

const navigationTabs = [
  // Row 1
  [
    { name: 'AquaBuild Pro', href: null, icon: Waves, isLogo: true },
    { name: 'Login', href: '/login', icon: LogIn },
  ],
  // Row 2
  [
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Contractors', href: '/contractors', icon: UserCheck },
  ],
  // Row 3
  [
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Accounts', href: '/accounts', icon: CreditCard },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ],
  // Row 4
  [
    { name: 'Marketing', href: '/marketing', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Materials', href: '/materials', icon: Package },
  ],
];

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleTabClick = (href: string | null) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      <div className="space-y-4 md:space-y-6">
        {navigationTabs.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`grid gap-4 ${
              rowIndex === 0 
                ? 'grid-cols-2' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {row.map((tab) => (
              <Card 
                key={tab.name}
                className={`transition-all duration-200 ${
                  tab.isLogo 
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700' 
                    : 'hover:shadow-lg hover:scale-105 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
                onClick={() => handleTabClick(tab.href)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                    <div className={`p-3 md:p-4 rounded-full ${
                      tab.isLogo 
                        ? 'bg-blue-500/10' 
                        : 'bg-blue-50 dark:bg-blue-900/30'
                    }`}>
                      <tab.icon className={`h-6 w-6 md:h-8 md:w-8 ${
                        tab.isLogo 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-gray-900 dark:text-white ${
                        tab.isLogo 
                          ? 'text-lg md:text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent' 
                          : 'text-base md:text-lg'
                      }`}>
                        {tab.name}
                      </h3>
                      {tab.isLogo && (
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Swimming Pool Construction
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
