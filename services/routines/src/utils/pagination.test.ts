import { describe, it, expect } from 'vitest';
import { parsePaginationParams, createPaginationMetadata } from './pagination';

describe('Pagination Utils', () => {
  describe('parsePaginationParams', () => {
    it('should use default values when no params provided', () => {
      const result = parsePaginationParams({});
      expect(result).toEqual({ page: 1, limit: 20 });
    });

    it('should parse valid page and limit params', () => {
      const result = parsePaginationParams({ page: '2', limit: '30' });
      expect(result).toEqual({ page: 2, limit: 30 });
    });

    it('should handle string values', () => {
      const result = parsePaginationParams({ page: '3', limit: '15' });
      expect(result).toEqual({ page: 3, limit: 15 });
    });

    it('should enforce maximum limit', () => {
      const result = parsePaginationParams({ limit: '200' });
      expect(result.limit).toBeLessThanOrEqual(100);
    });

    it('should handle invalid page parameter', () => {
      const result = parsePaginationParams({ page: 'invalid' });
      expect(result.page).toBe(1); // Default value
    });

    it('should handle negative values', () => {
      const result = parsePaginationParams({ page: '-1', limit: '-10' });
      expect(result).toEqual({ page: 1, limit: 20 }); // Default values
    });

    it('should handle zero values', () => {
      const result = parsePaginationParams({ page: '0', limit: '0' });
      expect(result).toEqual({ page: 1, limit: 20 }); // Default values
    });
  });

  describe('createPaginationMetadata', () => {
    it('should calculate pagination metadata correctly', () => {
      const result = createPaginationMetadata(2, 10, 25);
      expect(result).toEqual({
        currentPage: 2,
        pageSize: 10,
        totalItems: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPrevPage: true,
      });
    });

    it('should handle first page', () => {
      const result = createPaginationMetadata(1, 10, 25);
      expect(result).toEqual({
        currentPage: 1,
        pageSize: 10,
        totalItems: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPrevPage: false,
      });
    });

    it('should handle last page', () => {
      const result = createPaginationMetadata(3, 10, 25);
      expect(result).toEqual({
        currentPage: 3,
        pageSize: 10,
        totalItems: 25,
        totalPages: 3,
        hasNextPage: false,
        hasPrevPage: true,
      });
    });

    it('should handle empty results', () => {
      const result = createPaginationMetadata(1, 10, 0);
      expect(result).toEqual({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    });

    it('should handle single page of results', () => {
      const result = createPaginationMetadata(1, 10, 5);
      expect(result).toEqual({
        currentPage: 1,
        pageSize: 10,
        totalItems: 5,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });
    });
  });
});

