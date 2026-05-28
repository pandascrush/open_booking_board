---
name: error-handling
description: Error handling middleware patterns for the Bus Ticket Booking backend. Covers structured error responses, status code mapping for Zod/Prisma errors, and custom HttpError class. Use when modifying error handling or adding new error types.
---

# Error Handling Skill

## Error Handler Middleware (`src/middlewares/errorHandler.ts`)

The global error handler is the LAST middleware registered in Express:

```typescript
app.use(errorHandler); // Must be after all routes
```

## Error Type Mapping

| Error Type | HTTP Status | Response |
|-----------|-------------|----------|
| `ZodError` | 422 | Concatenated field-level messages |
| `Prisma P2025` | 404 | "Resource not found" |
| Custom `HttpError` | Dynamic | Uses `statusCode` from error |
| Everything else | 500 | "Internal server error" |

## Custom HttpError Class

Services throw `HttpError` for business logic errors:

```typescript
class HttpError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

// Usage in services:
throw new HttpError('Seat #5 is already booked', 409);
throw new HttpError('Seat #99 not found', 404);
```

## Controller Error Forwarding

Controllers wrap service calls in try/catch and forward to `next()`:

```typescript
try {
  const result = await ticketService.bookTicket(seatNumber, body);
  sendSuccess(res, 'Success', result);
} catch (error) {
  next(error); // → errorHandler middleware
}
```

## Adding New Error Types

1. Define the error condition in the service
2. Throw `HttpError` with the appropriate status code
3. The error handler will automatically format the response
