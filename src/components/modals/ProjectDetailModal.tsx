
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  User, 
  Calendar,
  DollarSign,
  FileText,
  Building
} from 'lucide-react';
import { Project } from '../../data/store';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Project Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{project.id}</p>
              </div>
              <Badge className={`${project.statusColor} text-white w-fit`}>
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Completion</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${project.statusColor}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Client: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.clientName}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Building className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Contractor: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.contractorName}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Location: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.city}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated: </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Scope</h3>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 break-words">{project.scope}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Details */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Status Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Project ID:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{project.id}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Current Status:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{project.status}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{project.progress}% Complete</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{project.city}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
