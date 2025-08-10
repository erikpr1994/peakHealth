'use client';

import type { Client, ClientFilters } from '../types';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { getClientsFromBrowser } from '../api/clients';

export const useClientManagement = (): {
  clients: Client[];
  loading: boolean;
  searchTerm: string;
  addClientOpen: boolean;
  assignProgramOpen: boolean;
  selectedClientForAssign: Client | null;
  activeClients: Client[];
  inactiveClients: Client[];
  clientsWithPrograms: Client[];
  fetchClients: () => Promise<void>;
  handleSearch: (value: string) => void;
  handleAssignProgram: (client: Client) => void;
  handleViewClientDetails: (client: Client) => void;
  openAddClientDialog: () => void;
  openAssignProgramDialog: () => void;
  closeAddClientDialog: () => void;
  closeAssignProgramDialog: () => void;
} => {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ClientFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [assignProgramOpen, setAssignProgramOpen] = useState(false);
  const [selectedClientForAssign, setSelectedClientForAssign] =
    useState<Client | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getClientsFromBrowser(filters);
      setClients(response.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await getClientsFromBrowser(filters);
        setClients(response.clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
        // TODO: Show error toast
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setFilters(prev => ({ ...prev, search: value }));
  }, []);

  const handleAssignProgram = useCallback((client: Client) => {
    setSelectedClientForAssign(client);
    setAssignProgramOpen(true);
  }, []);

  const handleViewClientDetails = useCallback(
    (client: Client) => {
      router.push(`/users/${client.id}`);
    },
    [router]
  );

  const openAddClientDialog = useCallback(() => {
    setAddClientOpen(true);
  }, []);

  const openAssignProgramDialog = useCallback(() => {
    setAssignProgramOpen(true);
  }, []);

  const closeAddClientDialog = useCallback(() => {
    setAddClientOpen(false);
  }, []);

  const closeAssignProgramDialog = useCallback(() => {
    setAssignProgramOpen(false);
    setSelectedClientForAssign(null);
  }, []);

  // Computed values
  const activeClients = clients.filter(
    client => client.profile?.onboarding_completed_at
  );
  const inactiveClients = clients.filter(
    client => !client.profile?.onboarding_completed_at
  );
  const clientsWithPrograms = clients.filter(
    client => client.stats && client.stats.total_workouts > 0
  );

  return {
    // Computed values
    activeClients,
    addClientOpen,
    assignProgramOpen,
    // State
    clients,
    clientsWithPrograms,
    closeAddClientDialog,

    closeAssignProgramDialog,
    // Actions
    fetchClients,
    handleAssignProgram,

    handleSearch,
    handleViewClientDetails,
    inactiveClients,
    loading,
    openAddClientDialog,
    openAssignProgramDialog,
    searchTerm,
    selectedClientForAssign,
  };
};
