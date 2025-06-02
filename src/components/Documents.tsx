
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Calendar,
  Filter,
  Image,
  Receipt,
  File,
  ClipboardList,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const documentsData = [
  {
    id: 1,
    name: 'Initial Quotation - Luxury Villa Pool',
    type: 'Quotation',
    project: 'AQ001 - Luxury Villa Pool',
    client: 'Rajesh Sharma',
    uploadDate: '2024-05-15',
    size: '2.4 MB',
    format: 'PDF',
    description: 'Initial project quotation with detailed breakdown'
  },
  {
    id: 2,
    name: 'Work Order - Resort Pool Construction',
    type: 'Work Order',
    project: 'AQ002 - Commercial Resort Pool',
    client: 'Green Valley Resort',
    uploadDate: '2024-05-18',
    size: '1.8 MB',
    format: 'PDF',
    description: 'Final work order for pool construction'
  },
  {
    id: 3,
    name: 'Meeting Minutes - Site Discussion',
    type: 'MOM',
    project: 'AQ001 - Luxury Villa Pool',
    client: 'Rajesh Sharma',
    uploadDate: '2024-05-20',
    size: '0.5 MB',
    format: 'DOC',
    description: 'Meeting minutes from site visit'
  },
  {
    id: 4,
    name: 'Payment Receipt - Advance Payment',
    type: 'Payment Receipt',
    project: 'AQ003 - Residential Pool Project',
    client: 'Priya Patel',
    uploadDate: '2024-05-22',
    size: '0.3 MB',
    format: 'PDF',
    description: 'Receipt for advance payment received'
  },
  {
    id: 5,
    name: 'Site Progress Photos',
    type: 'Photos',
    project: 'AQ001 - Luxury Villa Pool',
    client: 'Rajesh Sharma',
    uploadDate: '2024-05-25',
    size: '5.2 MB',
    format: 'ZIP',
    description: 'Construction progress photos'
  },
  {
    id: 6,
    name: 'GST Invoice',
    type: 'GST Documents',
    project: 'AQ002 - Commercial Resort Pool',
    client: 'Green Valley Resort',
    uploadDate: '2024-05-28',
    size: '0.8 MB',
    format: 'PDF',
    description: 'GST invoice for services'
  },
  {
    id: 7,
    name: 'Site Visit Report',
    type: 'Visit Reports',
    project: 'AQ003 - Residential Pool Project',
    client: 'Priya Patel',
    uploadDate: '2024-05-30',
    size: '1.2 MB',
    format: 'PDF',
    description: 'Detailed site visit inspection report'
  }
];

export const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'Quotation',
    project: '',
    description: '',
    file: null as File | null
  });
  const { toast } = useToast();

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
      case 'MOM': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Payment Receipt': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Photos': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'GST Documents': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Visit Reports': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Quotation': return <FileText className="h-6 w-6" />;
      case 'Work Order': return <ClipboardList className="h-6 w-6" />;
      case 'MOM': return <File className="h-6 w-6" />;
      case 'Payment Receipt': return <Receipt className="h-6 w-6" />;
      case 'Photos': return <Image className="h-6 w-6" />;
      case 'GST Documents': return <DollarSign className="h-6 w-6" />;
      case 'Visit Reports': return <FileText className="h-6 w-6" />;
      default: return <File className="h-6 w-6" />;
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic here
    toast({
      title: "Document Uploaded",
      description: `${uploadForm.name} has been uploaded successfully.`,
    });
    setIsUploadModalOpen(false);
    setUploadForm({ name: '', type: 'Quotation', project: '', description: '', file: null });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadForm({ ...uploadForm, file });
  };

  const handleViewDocument = (docName: string) => {
    toast({
      title: "Viewing Document",
      description: `Opening ${docName} in preview mode.`,
    });
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Document Type</Label>
                <Select value={uploadForm.type} onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quotation">Quotation</SelectItem>
                    <SelectItem value="Work Order">Work Order</SelectItem>
                    <SelectItem value="MOM">Meeting Minutes (MOM)</SelectItem>
                    <SelectItem value="Payment Receipt">Payment Receipt</SelectItem>
                    <SelectItem value="Photos">Photos</SelectItem>
                    <SelectItem value="GST Documents">GST Documents</SelectItem>
                    <SelectItem value="Visit Reports">Visit Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={uploadForm.project} onValueChange={(value) => setUploadForm({ ...uploadForm, project: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AQ001">AQ001 - Luxury Villa Pool</SelectItem>
                    <SelectItem value="AQ002">AQ002 - Commercial Resort Pool</SelectItem>
                    <SelectItem value="AQ003">AQ003 - Residential Pool Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Brief description of the document"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Choose File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
            
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Quotation">Quotation</SelectItem>
                  <SelectItem value="Work Order">Work Order</SelectItem>
                  <SelectItem value="MOM">Meeting Minutes</SelectItem>
                  <SelectItem value="Payment Receipt">Payment Receipt</SelectItem>
                  <SelectItem value="Photos">Photos</SelectItem>
                  <SelectItem value="GST Documents">GST Documents</SelectItem>
                  <SelectItem value="Visit Reports">Visit Reports</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-full sm:w-32">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getTypeColor(doc.type)}>
                  {doc.type}
                </Badge>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDocument(doc.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownload(doc.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">
                  {getTypeIcon(doc.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {doc.project}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                    {doc.description}
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

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or upload a new document.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
