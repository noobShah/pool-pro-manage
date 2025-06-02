
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';

const projectReports = [
  {
    id: 'AQ001',
    title: 'Luxury Villa Pool',
    client: 'Rajesh Sharma',
    city: 'Mumbai',
    totalValue: '₹15,50,000',
    paidAmount: '₹10,50,000',
    pendingAmount: '₹5,00,000',
    progress: 65,
    status: 'Under Construction'
  },
  {
    id: 'AQ002',
    title: 'Commercial Resort Pool',
    client: 'Green Valley Resort',
    city: 'Pune',
    totalValue: '₹45,80,000',
    paidAmount: '₹5,00,000',
    pendingAmount: '₹40,80,000',
    progress: 10,
    status: 'Quotation Sent'
  },
];

const paymentSummary = {
  totalReceivable: '₹85,60,000',
  totalReceived: '₹32,80,000',
  pendingFromClients: '₹52,80,000',
  paidToContractors: '₹18,50,000',
  pendingToContractors: '₹12,30,000'
};

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedCity, setSelectedCity] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Receivable</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentSummary.totalReceivable}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Amount Received</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentSummary.totalReceived}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending from Clients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentSummary.pendingFromClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Project Reports</TabsTrigger>
          <TabsTrigger value="payments">Payment Reports</TabsTrigger>
          <TabsTrigger value="clients">Client Reports</TabsTrigger>
          <TabsTrigger value="contractors">Contractor Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectReports.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{project.id} • {project.client}</p>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Total Value</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{project.totalValue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Amount Paid</p>
                        <p className="font-semibold text-green-600">{project.paidAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Pending Amount</p>
                        <p className="font-semibold text-orange-600">{project.pendingAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Progress</p>
                        <p className="font-semibold text-blue-600">{project.progress}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Payments Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Receivable:</span>
                  <span className="font-semibold">{paymentSummary.totalReceivable}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Received:</span>
                  <span className="font-semibold text-green-600">{paymentSummary.totalReceived}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Amount:</span>
                  <span className="font-semibold text-orange-600">{paymentSummary.pendingFromClients}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contractor Payments Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-semibold text-green-600">{paymentSummary.paidToContractors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Payments:</span>
                  <span className="font-semibold text-orange-600">{paymentSummary.pendingToContractors}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">Client analytics and performance metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contractors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">Contractor analytics and performance metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
