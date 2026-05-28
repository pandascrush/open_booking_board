---
name: validation-patterns
description: Zod validation patterns for the Bus Ticket Booking backend. Covers schema definitions, request body validation, path parameter validation, and error mapping to 422 responses. Use when adding or modifying input validation.
---

# Validation Patterns Skill

## Zod Schema Location

All schemas live in `src/validations/`. Each resource gets its own file (e.g., `ticket.validation.ts`).

## Schema Definitions

```typescript
import { z } from 'zod';

// Request body schema
export const bookTicketSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().email('Valid email is required'),
});

// Path param schema
export const seatNumberSchema = z.number()
  .int('Seat number must be an integer')
  .min(1, 'Seat number must be between 1 and 40')
  .max(40, 'Seat number must be between 1 and 40');
```

## Validation in Controllers

Validate at the controller level, before calling services:

```typescript
// Body validation
const body = bookTicketSchema.parse(req.body);

// Path param validation
const seatNumber = validateSeatNumber(req.params.seatNumber);
```

## Error Handling

Zod throws `ZodError` on validation failure. The global `errorHandler` middleware catches these and maps them to **422 Unprocessable Entity**:

```typescript
if (err instanceof ZodError) {
  const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
  res.status(422).json({ success: false, message: messages, statusCode: 422 });
}
```

## Adding New Validations

1. Create or update schema in `src/validations/`
2. Use `.parse()` in the controller (throws on failure)
3. Errors are automatically caught by `errorHandler`
