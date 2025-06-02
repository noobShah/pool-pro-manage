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
  status: 'Active' | 'Inactive' | 'Verified' | 'Premium';
  projectsCount: number;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  contractorId: string;
  contractorName: string;
  city: string;
  scope: string;
  status: 'Quotation Sent' | 'Under Construction' | 'Completed' | 'On Hold';
  progress: number;
  statusColor: string;
  totalValue?: string;
  startDate?: string;
  expectedCompletion?: string;
  lastUpdated: string;
}

export interface Document {
  id: string;
  projectId: string;
  projectName: string;
  type: 'quotation' | 'mom' | 'photos' | 'work-order' | 'payment-receipt' | 'gst-document' | 'visit-report';
  name: string;
  uploadDate: string;
  size: string;
  url?: string;
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
    clientId: 'CL001',
    clientName: 'Rajesh Sharma',
    contractorId: 'CT001',
    contractorName: 'AquaTech Solutions',
    city: 'Mumbai',
    scope: 'Swimming Pool Construction',
    status: 'Under Construction',
    progress: 65,
    statusColor: 'bg-green-500',
    totalValue: '₹15,50,000',
    startDate: '2024-03-15',
    expectedCompletion: '2024-07-15',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'AQ002',
    title: 'Commercial Resort Pool',
    clientId: 'CL003',
    clientName: 'Green Valley Resort',
    contractorId: 'CT002',
    contractorName: 'Pool Masters Inc',
    city: 'Goa',
    scope: 'Pool & Spa Complex',
    status: 'Quotation Sent',
    progress: 10,
    statusColor: 'bg-blue-500',
    totalValue: '₹45,80,000',
    startDate: '2024-06-01',
    expectedCompletion: '2024-12-15',
    lastUpdated: '1 day ago'
  },
  {
    id: 'AQ003',
    title: 'Residential Pool Project',
    clientId: 'CL002',
    clientName: 'Priya Patel',
    contractorId: 'CT003',
    contractorName: 'Elite Pools',
    city: 'Pune',
    scope: 'Swimming Pool',
    status: 'Completed',
    progress: 100,
    statusColor: 'bg-purple-500',
    totalValue: '₹8,25,000',
    startDate: '2024-01-10',
    expectedCompletion: '2024-04-30',
    lastUpdated: '1 week ago'
  }
];

// Store state
let clients: Client[] = [...initialClients];
let contractors: Contractor[] = [...initialContractors];
let projects: Project[] = [...initialProjects];
let documents: Document[] = [];

// Client functions
export function getClients(): Client[] {
  return [...clients];
}

export function addClient(client: Omit<Client, 'id' | 'projectsCount' | 'totalValue'>): Client {
  const newClient: Client = {
    ...client,
    id: `CL${String(clients.length + 1).padStart(3, '0')}`,
    projectsCount: 0,
    totalValue: '₹0'
  };
  clients.push(newClient);
  return newClient;
}

export function updateClient(id: string, updates: Partial<Client>): Client | null {
  const index = clients.findIndex(client => client.id === id);
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updates };
    return clients[index];
  }
  return null;
}

export function deleteClient(id: string): boolean {
  const index = clients.findIndex(client => client.id === id);
  if (index !== -1) {
    clients.splice(index, 1);
    return true;
  }
  return false;
}

export function getClientById(id: string): Client | null {
  return clients.find(client => client.id === id) || null;
}

// Contractor functions
export function getContractors(): Contractor[] {
  return [...contractors];
}

export function addContractor(contractor: Omit<Contractor, 'id' | 'projectsCount' | 'rating'>): Contractor {
  const newContractor: Contractor = {
    ...contractor,
    id: `CT${String(contractors.length + 1).padStart(3, '0')}`,
    projectsCount: 0,
    rating: 0
  };
  contractors.push(newContractor);
  return newContractor;
}

export function updateContractor(id: string, updates: Partial<Contractor>): Contractor | null {
  const index = contractors.findIndex(contractor => contractor.id === id);
  if (index !== -1) {
    contractors[index] = { ...contractors[index], ...updates };
    return contractors[index];
  }
  return null;
}

export function deleteContractor(id: string): boolean {
  const index = contractors.findIndex(contractor => contractor.id === id);
  if (index !== -1) {
    contractors.splice(index, 1);
    return true;
  }
  return false;
}

export function getContractorById(id: string): Contractor | null {
  return contractors.find(contractor => contractor.id === id) || null;
}

// Project functions
export function getProjects(): Project[] {
  return [...projects];
}

export function addProject(project: Omit<Project, 'id'>): Project {
  const newProject: Project = {
    ...project,
    id: `AQ${String(projects.length + 1).padStart(3, '0')}`
  };
  projects.push(newProject);
  updateClientProjectCount(project.clientId);
  updateContractorProjectCount(project.contractorId);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    return projects[index];
  }
  return null;
}

export function deleteProject(id: string): boolean {
  const project = projects.find(p => p.id === id);
  if (project) {
    const index = projects.findIndex(p => p.id === id);
    projects.splice(index, 1);
    updateClientProjectCount(project.clientId);
    updateContractorProjectCount(project.contractorId);
    return true;
  }
  return false;
}

export function getProjectById(id: string): Project | null {
  return projects.find(project => project.id === id) || null;
}

// Document functions
export function getDocuments(): Document[] {
  return [...documents];
}

export function addDocument(document: Omit<Document, 'id'>): Document {
  const newDocument: Document = {
    ...document,
    id: `DOC${String(documents.length + 1).padStart(3, '0')}`
  };
  documents.push(newDocument);
  return newDocument;
}

export function deleteDocument(id: string): boolean {
  const index = documents.findIndex(doc => doc.id === id);
  if (index !== -1) {
    documents.splice(index, 1);
    return true;
  }
  return false;
}

// Helper functions
function updateClientProjectCount(clientId: string): void {
  const client = clients.find(c => c.id === clientId);
  if (client) {
    const projectCount = projects.filter(p => p.clientId === clientId).length;
    client.projectsCount = projectCount;
  }
}

function updateContractorProjectCount(contractorId: string): void {
  const contractor = contractors.find(c => c.id === contractorId);
  if (contractor) {
    const projectCount = projects.filter(p => p.contractorId === contractorId).length;
    contractor.projectsCount = projectCount;
  }
}

// Export data for components
export function exportData() {
  return {
    clients: getClients(),
    contractors: getContractors(),
    projects: getProjects(),
    documents: getDocuments()
  };
}

export function importData(data: any) {
  if (data.clients) clients = data.clients;
  if (data.contractors) contractors = data.contractors;
  if (data.projects) projects = data.projects;
  if (data.documents) documents = data.documents;
}
