
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  projectsCount: number;
  totalValue: string;
  status: 'Active' | 'Premium' | 'Inactive';
}

export interface Contractor {
  id: number;
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  specialization: string;
  projectsCount: number;
  rating: number;
  status: 'Verified' | 'Premium' | 'Active' | 'Inactive';
}

export interface Project {
  id: string;
  title: string;
  clientId: number;
  clientName: string;
  city: string;
  contractorId: number;
  contractorName: string;
  status: 'Quotation Sent' | 'Under Construction' | 'Completed' | 'On Hold';
  scope: string;
  lastUpdated: string;
  progress: number;
  statusColor: string;
  totalValue?: string;
  startDate?: string;
  expectedCompletion?: string;
}

// Initial data
export let clients: Client[] = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    address: 'Bandra West, Mumbai',
    projectsCount: 2,
    totalValue: '₹15,50,000',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    city: 'Pune',
    address: 'Koregaon Park, Pune',
    projectsCount: 1,
    totalValue: '₹8,25,000',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Green Valley Resort',
    email: 'info@greenvalley.com',
    phone: '+91 76543 21098',
    city: 'Nashik',
    address: 'Nashik-Pune Highway',
    projectsCount: 3,
    totalValue: '₹45,80,000',
    status: 'Premium'
  },
  {
    id: 4,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 65432 10987',
    city: 'Aurangabad',
    address: 'CIDCO Area, Aurangabad',
    projectsCount: 1,
    totalValue: '₹12,30,000',
    status: 'Active'
  },
];

export let contractors: Contractor[] = [
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

export let projects: Project[] = [
  {
    id: 'AQ001',
    title: 'Luxury Villa Pool',
    clientId: 1,
    clientName: 'Rajesh Sharma',
    city: 'Mumbai',
    contractorId: 1,
    contractorName: 'AquaTech Solutions',
    status: 'Under Construction',
    scope: 'Infinity Pool + Deck',
    lastUpdated: '2 days ago',
    progress: 65,
    statusColor: 'bg-green-500',
    totalValue: '₹15,50,000',
    startDate: '2024-04-15',
    expectedCompletion: '2024-06-30'
  },
  {
    id: 'AQ002',
    title: 'Commercial Resort Pool',
    clientId: 3,
    clientName: 'Green Valley Resort',
    city: 'Pune',
    contractorId: 2,
    contractorName: 'Pool Masters Inc',
    status: 'Quotation Sent',
    scope: 'Olympic Size Pool',
    lastUpdated: '1 week ago',
    progress: 10,
    statusColor: 'bg-blue-500',
    totalValue: '₹45,80,000'
  },
  {
    id: 'AQ003',
    title: 'Residential Pool Project',
    clientId: 2,
    clientName: 'Priya Patel',
    city: 'Nashik',
    contractorId: 4,
    contractorName: 'AquaBuild Pro',
    status: 'Completed',
    scope: 'Standard Pool + Jacuzzi',
    lastUpdated: '3 days ago',
    progress: 100,
    statusColor: 'bg-purple-500',
    totalValue: '₹8,25,000',
    startDate: '2024-03-01',
    expectedCompletion: '2024-05-15'
  },
  {
    id: 'AQ004',
    title: 'Hotel Chain Pool',
    clientId: 4,
    clientName: 'Amit Kumar',
    city: 'Aurangabad',
    contractorId: 3,
    contractorName: 'Elite Pools',
    status: 'On Hold',
    scope: 'Rooftop Pool + Bar',
    lastUpdated: '5 days ago',
    progress: 25,
    statusColor: 'bg-yellow-500',
    totalValue: '₹12,30,000'
  },
];

// CRUD operations for clients
export const addClient = (client: Omit<Client, 'id'>) => {
  const newId = Math.max(...clients.map(c => c.id)) + 1;
  const newClient = { ...client, id: newId };
  clients.push(newClient);
  return newClient;
};

export const updateClient = (id: number, updates: Partial<Client>) => {
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) {
    clients[index] = { ...clients[index], ...updates };
    // Update related projects
    projects.forEach(project => {
      if (project.clientId === id) {
        project.clientName = clients[index].name;
      }
    });
    return clients[index];
  }
  return null;
};

export const deleteClient = (id: number) => {
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) {
    // Remove related projects
    projects = projects.filter(p => p.clientId !== id);
    return clients.splice(index, 1)[0];
  }
  return null;
};

// CRUD operations for contractors
export const addContractor = (contractor: Omit<Contractor, 'id'>) => {
  const newId = Math.max(...contractors.map(c => c.id)) + 1;
  const newContractor = { ...contractor, id: newId };
  contractors.push(newContractor);
  return newContractor;
};

export const updateContractor = (id: number, updates: Partial<Contractor>) => {
  const index = contractors.findIndex(c => c.id === id);
  if (index !== -1) {
    contractors[index] = { ...contractors[index], ...updates };
    // Update related projects
    projects.forEach(project => {
      if (project.contractorId === id) {
        project.contractorName = contractors[index].name;
      }
    });
    return contractors[index];
  }
  return null;
};

export const deleteContractor = (id: number) => {
  const index = contractors.findIndex(c => c.id === id);
  if (index !== -1) {
    // Update related projects to remove contractor reference
    projects.forEach(project => {
      if (project.contractorId === id) {
        project.contractorId = 0;
        project.contractorName = 'Unassigned';
      }
    });
    return contractors.splice(index, 1)[0];
  }
  return null;
};

// CRUD operations for projects
export const addProject = (project: Omit<Project, 'id'>) => {
  const projectCount = projects.length + 1;
  const newId = `AQ${projectCount.toString().padStart(3, '0')}`;
  const newProject = { ...project, id: newId };
  projects.push(newProject);
  
  // Update client project count
  const client = clients.find(c => c.id === project.clientId);
  if (client) {
    client.projectsCount += 1;
  }
  
  // Update contractor project count
  const contractor = contractors.find(c => c.id === project.contractorId);
  if (contractor) {
    contractor.projectsCount += 1;
  }
  
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Project>) => {
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    const oldProject = { ...projects[index] };
    projects[index] = { ...projects[index], ...updates };
    
    // Update client name if clientId changed
    if (updates.clientId && updates.clientId !== oldProject.clientId) {
      const client = clients.find(c => c.id === updates.clientId);
      if (client) {
        projects[index].clientName = client.name;
        // Update project counts
        const oldClient = clients.find(c => c.id === oldProject.clientId);
        if (oldClient) oldClient.projectsCount -= 1;
        client.projectsCount += 1;
      }
    }
    
    // Update contractor name if contractorId changed
    if (updates.contractorId && updates.contractorId !== oldProject.contractorId) {
      const contractor = contractors.find(c => c.id === updates.contractorId);
      if (contractor) {
        projects[index].contractorName = contractor.name;
        // Update project counts
        const oldContractor = contractors.find(c => c.id === oldProject.contractorId);
        if (oldContractor) oldContractor.projectsCount -= 1;
        contractor.projectsCount += 1;
      }
    }
    
    return projects[index];
  }
  return null;
};

export const deleteProject = (id: string) => {
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    const project = projects[index];
    
    // Update client project count
    const client = clients.find(c => c.id === project.clientId);
    if (client) {
      client.projectsCount -= 1;
    }
    
    // Update contractor project count
    const contractor = contractors.find(c => c.id === project.contractorId);
    if (contractor) {
      contractor.projectsCount -= 1;
    }
    
    return projects.splice(index, 1)[0];
  }
  return null;
};

// Getter functions
export const getClients = () => clients;
export const getContractors = () => contractors;
export const getProjects = () => projects;
export const getClient = (id: number) => clients.find(c => c.id === id);
export const getContractor = (id: number) => contractors.find(c => c.id === id);
export const getProject = (id: string) => projects.find(p => p.id === id);
