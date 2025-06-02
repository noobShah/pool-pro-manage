
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid3X3, 
  List, 
  MapPin, 
  User, 
  Calendar,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { ProjectModal } from './modals/ProjectModal';
import { ProjectDetailModal } from './modals/ProjectDetailModal';
import { getProjects, addProject, updateProject, deleteProject, Project } from '../data/store';
import { useToast } from '@/hooks/use-toast';

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [projects, setProjects] = useState(getProjects());
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.contractorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCity = filterCity === 'all' || project.city === filterCity;
    
    return matchesSearch && matchesStatus && matchesCity;
  });

  const handleAddProject = () => {
    setSelectedProject(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    if (window.confirm(`Are you sure you want to delete ${project.title}?`)) {
      deleteProject(project.id);
      setProjects(getProjects());
      toast({
        title: "Project deleted",
        description: `${project.title} has been removed successfully.`,
      });
    }
  };

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'lastUpdated'>) => {
    const projectWithTimestamp = {
      ...projectData,
      lastUpdated: 'Just now'
    };

    if (modalMode === 'add') {
      const newProject = addProject(projectWithTimestamp);
      toast({
        title: "Project added",
        description: `${newProject.title} has been added successfully.`,
      });
    } else if (selectedProject) {
      updateProject(selectedProject.id, projectWithTimestamp);
      toast({
        title: "Project updated",
        description: `${projectData.title} has been updated successfully.`,
      });
    }
    setProjects(getProjects());
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAddProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects, clients, contractors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Quotation Sent">Quotation Sent</SelectItem>
                  <SelectItem value="Under Construction">Under Construction</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Nashik">Nashik</SelectItem>
                  <SelectItem value="Aurangabad">Aurangabad</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg w-full sm:w-auto">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none flex-1 sm:flex-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none flex-1 sm:flex-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {project.id}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleViewProject(project)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteProject(project)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge 
                    className={`${project.statusColor} text-white`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-base md:text-lg truncate">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{project.clientName}</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{project.city}</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Updated {project.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${project.statusColor}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">{project.scope}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Contractor: {project.contractorName}</p>
                </div>

                <Button variant="outline" className="w-full text-xs md:text-sm" onClick={() => handleEditProject(project)}>
                  <Edit className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Edit Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {project.id} • {project.scope}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 dark:text-white">
                        {project.clientName}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 dark:text-white">
                        {project.city}
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        <Badge className={`${project.statusColor} text-white text-xs`}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${project.statusColor}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" onClick={() => handleViewProject(project)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={selectedProject}
        mode={modalMode}
      />

      <ProjectDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        project={selectedProject || null}
      />
    </div>
  );
};
