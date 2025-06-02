
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FolderOpen, 
  Users, 
  UserCheck, 
  DollarSign, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';

const statsData = [
  { name: 'Total Projects', value: 24, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Active Clients', value: 18, icon: Users, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'Contractors', value: 8, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Revenue (₹L)', value: 45.2, icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
];

const projectStatusData = [
  { name: 'Quotation Sent', value: 6, color: '#3B82F6' },
  { name: 'Under Construction', value: 8, color: '#10B981' },
  { name: 'Completed', value: 7, color: '#8B5CF6' },
  { name: 'On Hold', value: 3, color: '#F59E0B' },
];

const cityData = [
  { city: 'Mumbai', projects: 8 },
  { city: 'Pune', projects: 6 },
  { city: 'Nashik', projects: 4 },
  { city: 'Aurangabad', projects: 3 },
  { city: 'Nagpur', projects: 3 },
];

const upcomingMeetings = [
  { client: 'Rajesh Sharma', project: 'Villa Pool - Bandra', date: 'Today, 2:00 PM', type: 'Site Visit' },
  { client: 'Priya Patel', project: 'Commercial Pool - Andheri', date: 'Tomorrow, 10:00 AM', type: 'Meeting' },
  { client: 'Amit Kumar', project: 'Residential Pool - Powai', date: 'Dec 5, 11:00 AM', type: 'Final Review' },
];

const pendingPayments = [
  { client: 'Sunita Enterprises', amount: '₹2,50,000', dueDate: 'Overdue', type: 'client' },
  { contractor: 'AquaTech Solutions', amount: '₹1,80,000', dueDate: 'Dec 10', type: 'contractor' },
  { client: 'Green Valley Resort', amount: '₹4,20,000', dueDate: 'Dec 15', type: 'client' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          <Calendar className="h-4 w-4 mr-1" />
          December 2024
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects by City */}
        <Card>
          <CardHeader>
            <CardTitle>Projects by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Meetings & Visits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{meeting.client}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{meeting.project}</p>
                </div>
                <div className="text-right">
                  <Badge variant={meeting.type === 'Site Visit' ? 'default' : 'secondary'}>
                    {meeting.type}
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{meeting.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {payment.type === 'client' ? payment.client : payment.contractor}
                  </p>
                  <Badge variant={payment.type === 'client' ? 'default' : 'secondary'}>
                    {payment.type === 'client' ? 'From Client' : 'To Contractor'}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                  <p className={`text-sm ${payment.dueDate === 'Overdue' ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {payment.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
