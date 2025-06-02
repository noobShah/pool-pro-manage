
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Calendar,
  Filter
} from 'lucide-react';

const documentsData = [
  {
    id: 1,
    name: 'Initial Quotation - Luxury Villa Pool',
    type: 'Quotation',
    project: 'AQ001 - Luxury Villa Pool',
    client: 'Rajesh Sharma',
    uploadDate: '2024-05-15',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 2,
    name: 'Work Order - Resort Pool Construction',
    type: 'Work Order',
    project: 'AQ002 - Commercial Resort Pool',
    client: 'Green Valley Resort',
    uploadDate: '2024-05-18',
    size: '1.8 MB',
    format: 'PDF'
  },
  {
    id: 3,
    name: 'Meeting Minutes - Site Discussion',
    type: 'Meeting Minutes',
    project: 'AQ001 - Luxury Villa Pool',
    client: 'Rajesh Sharma',
    uploadDate: '2024-05-20',
    size: '0.5 MB',
    format: 'DOC'
  },
  {
    id: 4,
    name: 'Payment Receipt - Advance Payment',
    type: 'Payment Receipt',
    project: 'AQ003 - Residential Pool Project',
    client: 'Priya Patel',
    uploadDate: '2024-05-22',
    size: '0.3 MB',
    format: 'PDF'
  },
];

export const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  const filteredDocuments = documentsData.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesProject = filterProject === 'all' || doc.project.includes(filterProject);
    
    return matchesSearch && matchesType && matchesProject;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Quotation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Work Order': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Meeting Minutes': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Payment Receipt': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search documents, projects, clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Quotation">Quotation</SelectItem>
                  <SelectItem value="Work Order">Work Order</SelectItem>
                  <SelectItem value="Meeting Minutes">Meeting Minutes</SelectItem>
                  <SelectItem value="Payment Receipt">Payment Receipt</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="AQ001">AQ001</SelectItem>
                  <SelectItem value="AQ002">AQ002</SelectItem>
                  <SelectItem value="AQ003">AQ003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getTypeColor(doc.type)}>
                  {doc.type}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <FileText className="h-8 w-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {doc.project}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Client:</span>
                  <span className="font-medium">{doc.client}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span>{doc.format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Calendar className="h-4 w-4" />
                  <span>{doc.uploadDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
