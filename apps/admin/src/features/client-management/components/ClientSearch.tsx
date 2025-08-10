'use client';

import { Filter, Search } from 'lucide-react';
import React from 'react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

interface ClientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ClientSearch = ({
  onSearchChange,
  searchTerm,
}: ClientSearchProps): React.JSX.Element => {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          className="pl-9"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
        />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};
