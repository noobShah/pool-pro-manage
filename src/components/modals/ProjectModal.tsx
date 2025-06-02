
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Project, getClients, getContractors } from '../../data/store';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id' | 'lastUpdated'>) => void;
  project?: Project;
  mode: 'add' | 'edit';
}

export const ProjectModal = ({ isOpen, onClose, onSave, project, mode }: ProjectModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    clientId: 0,
    clientName: '',
    city: '',
    contractorId: 0,
    contractorName: '',
    status: 'Quotation Sent' as 'Quotation Sent' | 'Under Construction' | 'Completed' | 'On Hold',
    scope: '',
    progress: 0,
    statusColor: 'bg-blue-500',
    totalValue: '',
    startDate: '',
    expectedCompletion: ''
  });

  const clients = getClients();
  const contractors = getContractors();

  useEffect(() => {
    if (project && mode === 'edit') {
      setFormData({
        title: project.title,
        clientId: project.clientId,
        clientName: project.clientName,
        city: project.city,
        contractorId: project.contractorId,
        contractorName: project.contractorName,
        status: project.status,
        scope: project.scope,
        progress: project.progress,
        statusColor: project.statusColor,
        totalValue: project.totalValue || '',
        startDate: project.startDate || '',
        expectedCompletion: project.expectedCompletion || ''
      });
    } else {
      setFormData({
        title: '',
        clientId: 0,
        clientName: '',
        city: '',
        contractorId: 0,
        contractorName: '',
        status: 'Quotation Sent',
        scope: '',
        progress: 0,
        statusColor: 'bg-blue-500',
        totalValue: '',
        startDate: '',
        expectedCompletion: ''
      });
    }
  }, [project, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (clientId: string) => {
    const client = clients.find(c => c.id === parseInt(clientId));
    if (client) {
      setFormData(prev => ({
        ...prev,
        clientId: client.id,
        clientName: client.name,
        city: client.city
      }));
    }
  };

  const handleContractorChange = (contractorId: string) => {
    const contractor = contractors.find(c => c.id === parseInt(contractorId));
    if (contractor) {
      setFormData(prev => ({
        ...prev,
        contractorId: contractor.id,
        contractorName: contractor.name
      }));
    }
  };

  const handleStatusChange = (status: string) => {
    const statusColors = {
      'Quotation Sent': 'bg-blue-500',
      'Under Construction': 'bg-green-500',
      'Completed': 'bg-purple-500',
      'On Hold': 'bg-yellow-500'
    };
    setFormData(prev => ({
      ...prev,
      status: status as any,
      statusColor: statusColors[status as keyof typeof statusColors]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Project' : 'Edit Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={formData.clientId.toString()} onValueChange={handleClientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contractor">Contractor</Label>
            <Select value={formData.contractorId.toString()} onValueChange={handleContractorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a contractor" />
              </SelectTrigger>
              <SelectContent>
                {contractors.map((contractor) => (
                  <SelectItem key={contractor.id} value={contractor.id.toString()}>
                    {contractor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope">Scope of Work</Label>
            <Input
              id="scope"
              value={formData.scope}
              onChange={(e) => handleChange('scope', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quotation Sent">Quotation Sent</SelectItem>
                <SelectItem value="Under Construction">Under Construction</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => handleChange('progress', parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalValue">Total Value</Label>
            <Input
              id="totalValue"
              value={formData.totalValue}
              onChange={(e) => handleChange('totalValue', e.target.value)}
              placeholder="e.g., ₹15,50,000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedCompletion">Expected Completion</Label>
              <Input
                id="expectedCompletion"
                type="date"
                value={formData.expectedCompletion}
                onChange={(e) => handleChange('expectedCompletion', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Project' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
