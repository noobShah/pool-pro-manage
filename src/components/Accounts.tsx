
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Download, 
  CreditCard,
  Building,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const accountsData = [
  {
    id: 1,
    name: 'Business Checking',
    type: 'Checking',
    balance: 2450000,
    bank: 'HDFC Bank',
    accountNumber: '****1234',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Project Savings',
    type: 'Savings',
    balance: 5800000,
    bank: 'ICICI Bank',
    accountNumber: '****5678',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Payroll Account',
    type: 'Checking',
    balance: 890000,
    bank: 'SBI',
    accountNumber: '****9012',
    status: 'Active'
  },
];

export const Accounts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalBalance = accountsData.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Accounts</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-shrink-0">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Balance</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(totalBalance)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Accounts</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{accountsData.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Building className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerts</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">0</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <AlertCircle className="h-5 md:h-6 w-5 md:w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
            Bank Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accountsData.map((account) => (
              <div key={account.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                    <h3 className="font-medium text-gray-900 dark:text-white">{account.name}</h3>
                    <Badge variant="outline" className="w-fit">{account.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {account.bank} • {account.accountNumber}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(account.balance)}
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {account.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
