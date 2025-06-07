
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  TrendingUp,
  Users,
  Mail,
  Phone,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

const campaignsData = [
  {
    id: 1,
    name: 'Summer Pool Promotion',
    type: 'Email Campaign',
    status: 'Active',
    leads: 45,
    conversions: 8,
    budget: 50000,
    startDate: '2024-11-01',
    endDate: '2024-12-31'
  },
  {
    id: 2,
    name: 'Luxury Villa Targeting',
    type: 'Social Media',
    status: 'Planning',
    leads: 0,
    conversions: 0,
    budget: 75000,
    startDate: '2024-12-15',
    endDate: '2025-01-31'
  },
  {
    id: 3,
    name: 'Commercial Pool Solutions',
    type: 'Google Ads',
    status: 'Completed',
    leads: 32,
    conversions: 12,
    budget: 100000,
    startDate: '2024-10-01',
    endDate: '2024-11-30'
  },
];

const leadsData = [
  {
    id: 1,
    name: 'Amit Sharma',
    email: 'amit@example.com',
    phone: '+91-9876543210',
    source: 'Website',
    status: 'Hot',
    project: 'Residential Pool',
    value: 850000
  },
  {
    id: 2,
    name: 'Green Valley Hotels',
    email: 'info@greenvalley.com',
    phone: '+91-9876543211',
    source: 'Google Ads',
    status: 'Warm',
    project: 'Commercial Pool',
    value: 2500000
  },
];

export const Marketing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'Hot': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Warm': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const totalLeads = leadsData.length;
  const totalBudget = campaignsData.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalConversions = campaignsData.reduce((sum, campaign) => sum + campaign.conversions, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Marketing</h1>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{totalLeads}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Users className="h-5 md:h-6 w-5 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{totalConversions}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Target className="h-5 md:h-6 w-5 md:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">{formatCurrency(totalBudget)}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <BarChart3 className="h-5 md:h-6 w-5 md:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">
                  {totalLeads > 0 ? Math.round((totalConversions / totalLeads) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-orange-600" />
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
              placeholder="Search campaigns or leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignsData.map((campaign) => (
                  <div key={campaign.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{campaign.name}</h3>
                        <Badge variant="outline">{campaign.type}</Badge>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 lg:mt-0 lg:w-64">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.leads}</div>
                        <div className="text-xs text-gray-500">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.conversions}</div>
                        <div className="text-xs text-gray-500">Conversions</div>
                      </div>
                      <div className="text-center col-span-2 lg:col-span-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(campaign.budget)}</div>
                        <div className="text-xs text-gray-500">Budget</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadsData.map((lead) => (
                  <div key={lead.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{lead.name}</h3>
                        <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 lg:mt-0 lg:w-80">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.source}</div>
                        <div className="text-xs text-gray-500">Source</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.project}</div>
                        <div className="text-xs text-gray-500">Project Type</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(lead.value)}</div>
                        <div className="text-xs text-gray-500">Est. Value</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
