
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
  Edit,
  Trash2
} from 'lucide-react';
import { ClientModal } from './modals/ClientModal';
import { ClientDetailModal } from './modals/ClientDetailModal';
import { getClients, addClient, updateClient, deleteClient, Client } from '../data/store';
import { useToast } from '@/hooks/use-toast';

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [clients, setClients] = useState(getClients());
  const { toast } = useToast();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    setSelectedClient(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      deleteClient(client.id);
      setClients(getClients());
      toast({
        title: "Client deleted",
        description: `${client.name} has been removed successfully.`,
      });
    }
  };

  const handleSaveClient = (clientData: Omit<Client, 'id' | 'projectsCount' | 'totalValue'>) => {
    if (modalMode === 'add') {
      const newClient = addClient(clientData);
      toast({
        title: "Client added",
        description: `${newClient.name} has been added successfully.`,
      });
    } else if (selectedClient) {
      updateClient(selectedClient.id, clientData);
      toast({
        title: "Client updated",
        description: `${clientData.name} has been updated successfully.`,
      });
    }
    setClients(getClients());
  };

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
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAddClient}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-3 md:p-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteClient(client)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 md:h-12 md:w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-sm md:text-base">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">{client.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{client.city}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{client.phone}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{client.address}</span>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Projects</span>
                  <div className="flex items-center">
                    <FolderOpen className="h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{client.projectsCount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                  <span className="font-semibold text-green-600 text-sm">{client.totalValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        client={selectedClient}
        mode={modalMode}
      />

      <ClientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        client={selectedClient || null}
      />
    </div>
  );
};
