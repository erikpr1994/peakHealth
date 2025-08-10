'use client';

import { Loader2, Plus, Target } from 'lucide-react';
import React from 'react';

import { Button } from '../../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { useClientManagement } from '../hooks';
import { AddClientDialog } from './AddClientDialog';
import { AssignProgramDialog } from './AssignProgramDialog';
import { ClientList } from './ClientList';
import { ClientSearch } from './ClientSearch';
import { ClientStats } from './ClientStats';

export const ClientManagement = (): React.JSX.Element => {
  const {
    activeClients,
    addClientOpen,
    assignProgramOpen,
    clients,
    clientsWithPrograms,
    closeAddClientDialog,
    closeAssignProgramDialog,
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
  } = useClientManagement();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Manage your client roster, track program assignments, and monitor
            overall client health.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openAssignProgramDialog}>
            <Target className="h-4 w-4 mr-2" />
            Assign Program
          </Button>
          <Button onClick={openAddClientDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <ClientStats clients={clients} />

      {/* Search and Filter */}
      <ClientSearch searchTerm={searchTerm} onSearchChange={handleSearch} />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All Clients ({clients.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeClients.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({inactiveClients.length})
            </TabsTrigger>
            <TabsTrigger value="with_programs">
              With Programs ({clientsWithPrograms.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ClientList
              clients={clients}
              onViewClient={handleViewClientDetails}
              onAssignProgram={handleAssignProgram}
            />
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <ClientList
              clients={activeClients}
              onViewClient={handleViewClientDetails}
              onAssignProgram={handleAssignProgram}
            />
          </TabsContent>

          <TabsContent value="inactive" className="space-y-4">
            <ClientList
              clients={inactiveClients}
              onViewClient={handleViewClientDetails}
              onAssignProgram={handleAssignProgram}
            />
          </TabsContent>

          <TabsContent value="with_programs" className="space-y-4">
            <ClientList
              clients={clientsWithPrograms}
              onViewClient={handleViewClientDetails}
              onAssignProgram={handleAssignProgram}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Dialogs */}
      <AddClientDialog
        open={addClientOpen}
        onOpenChange={closeAddClientDialog}
        onClientAdded={fetchClients}
      />
      <AssignProgramDialog
        open={assignProgramOpen}
        onOpenChange={closeAssignProgramDialog}
        selectedClient={selectedClientForAssign || undefined}
        onProgramAssigned={fetchClients}
      />
    </div>
  );
};
