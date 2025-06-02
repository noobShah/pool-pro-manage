
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
  FileText, 
  FolderOpen,
  Star,
  Eye,
  Edit
} from 'lucide-react';

const contractorsData = [
  {
    id: 1,
    name: 'AquaTech Solutions',
    email: 'contact@aquatech.com',
    phone: '+91 98765 43210',
    gstNumber: '27ABCDE1234F1Z5',
    specialization: 'Infinity Pools',
    projectsCount: 8,
    rating: 4.8,
    status: 'Verified'
  },
  {
    id: 2,
    name: 'Pool Masters Inc',
    email: 'info@poolmasters.com',
    phone: '+91 87654 32109',
    gstNumber: '27FGHIJ5678K2Y4',
    specialization: 'Commercial Pools',
    projectsCount: 5,
    rating: 4.6,
    status: 'Verified'
  },
  {
    id: 3,
    name: 'Elite Pools',
    email: 'hello@elitepools.com',
    phone: '+91 76543 21098',
    gstNumber: '27LMNOP9012M3X7',
    specialization: 'Luxury Resorts',
    projectsCount: 12,
    rating: 4.9,
    status: 'Premium'
  },
  {
    id: 4,
    name: 'AquaBuild Pro',
    email: 'team@aquabuild.com',
    phone: '+91 65432 10987',
    gstNumber: '27QRSTU3456N4W8',
    specialization: 'Residential Pools',
    projectsCount: 3,
    rating: 4.4,
    status: 'Active'
  },
];

export const Contractors = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContractors = contractorsData.filter(contractor =>
    contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Verified': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contractors</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Contractor
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search contractors by name, email, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contractors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContractors.map((contractor) => (
          <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(contractor.status)}>
                  {contractor.status}
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
                  <AvatarFallback className="bg-green-100 text-green-600 font-medium">
                    {getInitials(contractor.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{contractor.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contractor.specialization}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {renderStars(contractor.rating)}
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">
                  {contractor.rating}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{contractor.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  {contractor.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{contractor.gstNumber}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Projects</span>
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">{contractor.projectsCount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
