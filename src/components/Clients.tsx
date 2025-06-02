
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  FolderOpen,
  Eye,
  Edit
} from 'lucide-react';

const clientsData = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    address: 'Bandra West, Mumbai',
    projectsCount: 2,
    totalValue: '₹15,50,000',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    city: 'Pune',
    address: 'Koregaon Park, Pune',
    projectsCount: 1,
    totalValue: '₹8,25,000',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Green Valley Resort',
    email: 'info@greenvalley.com',
    phone: '+91 76543 21098',
    city: 'Nashik',
    address: 'Nashik-Pune Highway',
    projectsCount: 3,
    totalValue: '₹45,80,000',
    status: 'Premium'
  },
  {
    id: 4,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 65432 10987',
    city: 'Aurangabad',
    address: 'CIDCO Area, Aurangabad',
    projectsCount: 1,
    totalValue: '₹12,30,000',
    status: 'Active'
  },
];

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search clients by name, email, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{client.city}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{client.address}</span>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Projects</span>
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">{client.projectsCount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                  <span className="font-semibold text-green-600">{client.totalValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
