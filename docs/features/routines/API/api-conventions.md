# API Conventions and Standards

## Overview

This document outlines the API-wide conventions for error handling, pagination, and rate limiting. A consistent approach to these cross-cutting concerns ensures a predictable and reliable developer experience.

---

## 1. Error Responses (RFC 9457)

All error responses adhere to the **RFC 9457 Problem Details for HTTP APIs** standard. This provides machine-readable error details.

-   **`Content-Type`**: `application/problem+json`
-   **`status`**: The HTTP status code is mirrored in the JSON body.
-   **`type`**: A unique URI identifying the error type.
-   **`title`**: A short, human-readable summary of the error.
-   **`detail`**: A human-readable explanation specific to this occurrence.
-   **`instance`**: The request path that triggered the error.

### Example: Not Found (404)

```json
{
  "type": "https://api.peakhealth.com/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "A routine with the specified ID does not exist.",
  "instance": "/api/templates/routines/60d21b4667d0d8992e610c8b"
}
```

### Example: Validation Error (422)

For validation errors, an additional `errors` array is included.

```json
{
  "type": "https://api.peakhealth.com/errors/validation-error",
  "title": "Validation Error",
  "status": 422,
  "detail": "The request body contains invalid data.",
  "instance": "/api/library/sections",
  "errors": [
    {
      "field": "name",
      "message": "Section name cannot be empty."
    },
    {
      "field": "type",
      "message": "'aerobic' is not a valid section type."
    }
  ]
}
```

---

## 2. Pagination

All endpoints that return a collection of resources are paginated.

### Query Parameters

-   **`page`** (number, default: `1`): The page number to retrieve.
-   **`limit`** (number, default: `20`, max: `100`): The number of items to return per page.

### Response Body

The response for a paginated endpoint is an object containing the `data` and `pagination` metadata.

```json
{
  "data": [
    // ... array of resources ...
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 3. Rate Limiting

To ensure API stability, requests are rate-limited.

### Rate Limit Headers

Every API response includes the following headers to help clients manage their request rate:

-   `X-RateLimit-Limit`: The total number of requests allowed in the current window.
-   `X-RateLimit-Remaining`: The number of requests remaining in the current window.
-   `X-RateLimit-Reset`: The UTC timestamp (in seconds) when the rate limit window will reset.

### Error Response (429)

When the rate limit is exceeded, the API will respond with an `HTTP 429 Too Many Requests` status and the following body:

```json
{
  "type": "https://api.peakhealth.com/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "You have exceeded the request limit. Please try again later.",
  "instance": "/api/library/workouts"
}
```
