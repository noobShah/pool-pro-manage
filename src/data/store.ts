
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  status: 'Active' | 'Premium' | 'Inactive';
  projectsCount: number;
  totalValue: string;
}

export interface Contractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  specialization: string;
  status: 'Active' | 'Inactive';
  projectsCount: number;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  clientId: string;
  contractor: string;
  contractorId: string;
  city: string;
  scope: string;
  status: 'Planning' | 'Under Construction' | 'Completed' | 'On Hold';
  progress: number;
  startDate: string;
  endDate: string;
  budget: string;
  description: string;
}

// Initial data
export const initialClients: Client[] = [
  {
    id: 'CL001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    address: '123 Marine Drive, Mumbai, Maharashtra 400001',
    status: 'Active',
    projectsCount: 2,
    totalValue: '₹25,50,000'
  },
  {
    id: 'CL002',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    city: 'Pune',
    address: '456 FC Road, Pune, Maharashtra 411005',
    status: 'Premium',
    projectsCount: 1,
    totalValue: '₹8,25,000'
  },
  {
    id: 'CL003',
    name: 'Green Valley Resort',
    email: 'booking@greenvalley.com',
    phone: '+91 76543 21098',
    city: 'Goa',
    address: '789 Beach Road, Goa 403516',
    status: 'Active',
    projectsCount: 1,
    totalValue: '₹45,80,000'
  }
];

export const initialContractors: Contractor[] = [
  {
    id: 'CT001',
    name: 'AquaTech Solutions',
    email: 'info@aquatech.com',
    phone: '+91 99887 76655',
    gstNumber: '27ABCDE1234F1Z5',
    specialization: 'Residential Pools',
    status: 'Active',
    projectsCount: 5,
    rating: 4.8
  },
  {
    id: 'CT002',
    name: 'Pool Masters Inc',
    email: 'contact@poolmasters.com',
    phone: '+91 88776 65544',
    gstNumber: '27FGHIJ5678K2L6',
    specialization: 'Commercial Pools',
    status: 'Active',
    projectsCount: 3,
    rating: 4.6
  },
  {
    id: 'CT003',
    name: 'Elite Pools',
    email: 'hello@elitepools.com',
    phone: '+91 77665 54433',
    gstNumber: '27MNOPQ9012R3S7',
    specialization: 'Luxury Pools',
    status: 'Active',
    projectsCount: 8,
    rating: 4.9
  }
];

export const initialProjects: Project[] = [
  {
    id: 'AQ001',
    title: 'Luxury Villa Pool',
    client: 'Rajesh Sharma',
    clientId: 'CL001',
    contractor: 'AquaTech Solutions',
    contractorId: 'CT001',
    city: 'Mumbai',
    scope: 'Swimming Pool Construction',
    status: 'Under Construction',
    progress: 65,
    startDate: '2024-03-15',
    endDate: '2024-07-15',
    budget: '₹15,50,000',
    description: 'Luxury residential swimming pool with infinity edge design, integrated spa, and LED lighting system.'
  },
  {
    id: 'AQ002',
    title: 'Commercial Resort Pool',
    client: 'Green Valley Resort',
    clientId: 'CL003',
    contractor: 'Pool Masters Inc',
    contractorId: 'CT002',
    city: 'Goa',
    scope: 'Pool & Spa Complex',
    status: 'Planning',
    progress: 10,
    startDate: '2024-06-01',
    endDate: '2024-12-15',
    budget: '₹45,80,000',
    description: 'Large commercial resort pool complex with multiple pools, water features, and spa facilities.'
  },
  {
    id: 'AQ003',
    title: 'Residential Pool Project',
    client: 'Priya Patel',
    clientId: 'CL002',
    contractor: 'Elite Pools',
    contractorId: 'CT003',
    city: 'Pune',
    scope: 'Swimming Pool',
    status: 'Completed',
    progress: 100,
    startDate: '2024-01-10',
    endDate: '2024-04-30',
    budget: '₹8,25,000',
    description: 'Modern residential swimming pool with automated cleaning system and energy-efficient heating.'
  }
];

// Store management functions
export class DataStore {
  private static clients: Client[] = [...initialClients];
  private static contractors: Contractor[] = [...initialContractors];
  private static projects: Project[] = [...initialProjects];

  // Client methods
  static getClients(): Client[] {
    return [...this.clients];
  }

  static addClient(client: Omit<Client, 'id' | 'projectsCount' | 'totalValue'>): Client {
    const newClient: Client = {
      ...client,
      id: `CL${String(this.clients.length + 1).padStart(3, '0')}`,
      projectsCount: 0,
      totalValue: '₹0'
    };
    this.clients.push(newClient);
    return newClient;
  }

  static updateClient(id: string, updates: Partial<Client>): Client | null {
    const index = this.clients.findIndex(client => client.id === id);
    if (index !== -1) {
      this.clients[index] = { ...this.clients[index], ...updates };
      return this.clients[index];
    }
    return null;
  }

  static deleteClient(id: string): boolean {
    const index = this.clients.findIndex(client => client.id === id);
    if (index !== -1) {
      this.clients.splice(index, 1);
      return true;
    }
    return false;
  }

  static getClientById(id: string): Client | null {
    return this.clients.find(client => client.id === id) || null;
  }

  // Contractor methods
  static getContractors(): Contractor[] {
    return [...this.contractors];
  }

  static addContractor(contractor: Omit<Contractor, 'id' | 'projectsCount' | 'rating'>): Contractor {
    const newContractor: Contractor = {
      ...contractor,
      id: `CT${String(this.contractors.length + 1).padStart(3, '0')}`,
      projectsCount: 0,
      rating: 0
    };
    this.contractors.push(newContractor);
    return newContractor;
  }

  static updateContractor(id: string, updates: Partial<Contractor>): Contractor | null {
    const index = this.contractors.findIndex(contractor => contractor.id === id);
    if (index !== -1) {
      this.contractors[index] = { ...this.contractors[index], ...updates };
      return this.contractors[index];
    }
    return null;
  }

  static deleteContractor(id: string): boolean {
    const index = this.contractors.findIndex(contractor => contractor.id === id);
    if (index !== -1) {
      this.contractors.splice(index, 1);
      return true;
    }
    return false;
  }

  static getContractorById(id: string): Contractor | null {
    return this.contractors.find(contractor => contractor.id === id) || null;
  }

  // Project methods
  static getProjects(): Project[] {
    return [...this.projects];
  }

  static addProject(project: Omit<Project, 'id'>): Project {
    const newProject: Project = {
      ...project,
      id: `AQ${String(this.projects.length + 1).padStart(3, '0')}`
    };
    this.projects.push(newProject);
    this.updateClientProjectCount(project.clientId);
    this.updateContractorProjectCount(project.contractorId);
    return newProject;
  }

  static updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      return this.projects[index];
    }
    return null;
  }

  static deleteProject(id: string): boolean {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      const index = this.projects.findIndex(p => p.id === id);
      this.projects.splice(index, 1);
      this.updateClientProjectCount(project.clientId);
      this.updateContractorProjectCount(project.contractorId);
      return true;
    }
    return false;
  }

  static getProjectById(id: string): Project | null {
    return this.projects.find(project => project.id === id) || null;
  }

  // Helper methods for updating counts
  private static updateClientProjectCount(clientId: string): void {
    const client = this.clients.find(c => c.id === clientId);
    if (client) {
      const projectCount = this.projects.filter(p => p.clientId === clientId).length;
      client.projectsCount = projectCount;
    }
  }

  private static updateContractorProjectCount(contractorId: string): void {
    const contractor = this.contractors.find(c => c.id === contractorId);
    if (contractor) {
      const projectCount = this.projects.filter(p => p.contractorId === contractorId).length;
      contractor.projectsCount = projectCount;
    }
  }

  // View details methods (for the eye icon functionality)
  static viewClientDetails(id: string): Client | null {
    return this.getClientById(id);
  }

  static viewContractorDetails(id: string): Contractor | null {
    return this.getContractorById(id);
  }

  static viewProjectDetails(id: string): Project | null {
    return this.getProjectById(id);
  }
}
