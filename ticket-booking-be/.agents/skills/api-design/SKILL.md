---
name: api-design
description: REST API design conventions for the Bus Ticket Booking backend. Covers route naming, versioning (/api/v1), response format, HTTP methods, and status codes. Use when creating or modifying API endpoints.
---

# API Design Skill

## Response Format

All endpoints must return a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Route Naming Conventions

- All routes prefixed with `/api/v1`
- Resource-based naming: `/api/v1/tickets`, `/api/v1/admin`
- Use path params for single resources: `/api/v1/tickets/:seatNumber`
- Use action suffixes for operations: `/api/v1/tickets/:seatNumber/book`

## HTTP Method Usage

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve resource(s) | `GET /api/v1/tickets` |
| POST | Create / Execute action | `POST /api/v1/tickets/:seatNumber/book` |
| DELETE | Remove / Release resource | `DELETE /api/v1/tickets/:seatNumber/release` |

## Status Code Mapping

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful booking (POST) |
| 400 | Bad Request | Invalid state (e.g., releasing an OPEN seat) |
| 401 | Unauthorized | Missing/invalid admin secret |
| 404 | Not Found | Seat number doesn't exist |
| 409 | Conflict | Booking an already-CLOSED seat |
| 422 | Unprocessable Entity | Zod validation errors |
| 500 | Internal Server Error | Unexpected errors |

## Controller Pattern

Controllers are thin HTTP handlers. They:
1. Extract and validate input (path params, body)
2. Delegate to service functions
3. Send formatted response
4. Pass errors to `next()` for the error handler middleware
