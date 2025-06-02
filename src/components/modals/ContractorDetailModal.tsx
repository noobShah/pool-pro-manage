
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Mail, 
  Phone, 
  FileText, 
  FolderOpen,
  Star,
  User
} from 'lucide-react';
import { Contractor } from '../../data/store';

interface ContractorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractor: Contractor | null;
}

export const ContractorDetailModal = ({ isOpen, onClose, contractor }: ContractorDetailModalProps) => {
  if (!contractor) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contractor Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-green-100 text-green-600 font-medium text-lg">
                {getInitials(contractor.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{contractor.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{contractor.specialization}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center space-x-1 mr-4">
                  {renderStars(contractor.rating)}
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">
                    {contractor.rating}
                  </span>
                </div>
                <Badge className={getStatusColor(contractor.status)}>
                  {contractor.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="break-all">{contractor.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>{contractor.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="break-all">{contractor.gstNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Information</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">Active Projects</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{contractor.projectsCount}</span>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Overall Rating</span>
                    <div className="flex items-center">
                      {renderStars(contractor.rating)}
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">{contractor.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Contractor ID:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{contractor.id}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{contractor.status}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Specialization:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{contractor.specialization}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">GST Number:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{contractor.gstNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
