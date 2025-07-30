import { useState } from 'react';
import { Page } from '../types/app';

export function useAppNavigation() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleNavigate = (page: Page, itemId?: string) => {
    setCurrentPage(page);
    if (itemId) {
      setSelectedItemId(itemId);
    }
  };

  return {
    currentPage,
    selectedItemId,
    handleNavigate
  };
}