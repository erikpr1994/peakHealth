import type { ClientFilters, ClientListResponse } from '../types';

export const getClientsClient = async (
  filters: ClientFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<ClientListResponse> => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append('search', filters.search);
  }
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  // Use XMLHttpRequest for better compatibility
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/admin/clients?${params.toString()}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      } else {
        reject(new Error('Failed to fetch clients'));
      }
    };
    xhr.onerror = () => reject(new Error('Failed to fetch clients'));
    xhr.send();
  });
};
