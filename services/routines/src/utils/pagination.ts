/**
 * Pagination utility functions
 */

/**
 * Parse pagination parameters from request query
 * @param query Request query object
 * @returns Parsed pagination parameters
 */
export const parsePaginationParams = (query: any) => {
  // Default values
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 100;

  // Parse page parameter
  let page = DEFAULT_PAGE;
  if (query.page) {
    const parsedPage = parseInt(query.page, 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      page = parsedPage;
    }
  }

  // Parse limit parameter
  let limit = DEFAULT_LIMIT;
  if (query.limit) {
    const parsedLimit = parseInt(query.limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      // Enforce maximum limit
      limit = Math.min(parsedLimit, MAX_LIMIT);
    }
  }

  return { page, limit };
};

/**
 * Create pagination metadata object
 * @param page Current page number
 * @param limit Items per page
 * @param totalItems Total number of items
 * @returns Pagination metadata object
 */
export const createPaginationMetadata = (
  page: number,
  limit: number,
  totalItems: number
) => {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    pageSize: limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
