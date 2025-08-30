## Description

This PR implements a paginated endpoint for listing user routines. It includes:

- Pagination utility functions for parsing query parameters and generating metadata
- Updated routine service to support pagination with skip/limit
- Updated controller to handle pagination parameters and return standardized response
- Comprehensive tests for all new functionality
- Converted tests from Jest to Vitest

## Features

- Paginated listing of user routines with customizable page size
- Sorting by most recently updated
- Optional type filtering ('user', 'active', 'assigned')
- Standardized pagination metadata in response

## Response Format

```typescript
{
  data: Routine[],
  pagination: {
    currentPage: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
  }
}
```

## Query Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `type`: Optional filter ('active', 'user', 'assigned')

## Testing

All tests have been updated to use Vitest instead of Jest and are passing.

Closes BAC-13
