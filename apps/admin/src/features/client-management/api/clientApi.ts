import type {
  AddClientData,
  AssignProgramData,
  Client,
  ClientListResponse,
  ClientFilters,
  UpdateClientData,
} from '../types';

// Client-side API functions that call the server API routes

export const getClients = async (
  filters: ClientFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<ClientListResponse> => {
  const searchParams = new URLSearchParams();

  if (filters.search) {
    searchParams.append('search', filters.search);
  }
  searchParams.append('page', page.toString());
  searchParams.append('pageSize', pageSize.toString());

  const response = await fetch(`/api/admin/clients?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }

  return response.json();
};

export const getClientById = async (
  clientId: string
): Promise<Client | null> => {
  const response = await fetch(`/api/admin/clients/${clientId}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch client');
  }

  return response.json();
};

export const updateClient = async (
  clientId: string,
  updateData: UpdateClientData
): Promise<Client> => {
  const response = await fetch(`/api/admin/clients/${clientId}`, {
    body: JSON.stringify(updateData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error('Failed to update client');
  }

  return response.json();
};

export const addClient = async (clientData: AddClientData): Promise<Client> => {
  const response = await fetch('/api/admin/clients', {
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to add client');
  }

  return response.json();
};

export const assignProgram = async (
  programData: AssignProgramData
): Promise<void> => {
  const response = await fetch('/api/admin/clients/assign-program', {
    body: JSON.stringify(programData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to assign program');
  }
};
