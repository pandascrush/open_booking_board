---
name: express-structure
description: Project folder structure and Express.js patterns for the Bus Ticket Booking backend. Covers the controller-service pattern, middleware chain order, and module organization. Use when adding new modules or restructuring the backend.
---

# Express Structure Skill

## Folder Structure

```
src/
  config/          → Environment config (dotenv loader)
  constants/       → Enums, shared constants, event names
  controllers/     → Thin HTTP handlers (delegate to services)
  crons/           → Scheduled jobs (node-cron)
  middlewares/     → Request logger, auth guards, error handler
  routes/          → Express routers wired to controllers
  scripts/         → Seed scripts, migration helpers
  services/        → All business logic (emit events here)
  types/           → TypeScript interfaces and DTOs
  utils/           → Event emitter, logger, response helpers
  validations/     → Zod schemas for request validation
  main.ts          → Express app bootstrap
```

## Controller-Service Pattern

### Controllers (`src/controllers/`)
- Thin HTTP handlers only
- Extract request data (params, body, query)
- Call validation functions
- Delegate to service functions
- Call `sendSuccess()` or pass errors to `next()`
- **Never** contain business logic or direct DB queries

### Services (`src/services/`)
- Contain all business logic
- Interact with Prisma client directly
- Emit domain events after successful DB writes
- Throw `HttpError` with appropriate status codes
- Return plain data objects (not Response objects)

## Middleware Chain Order (in main.ts)

```typescript
app.use(cors());
app.use(express.json());
app.use(requestLogger);     // Log every request
// ... routes ...
app.use(errorHandler);      // Must be LAST — catches all errors
```

## Adding New Modules

1. Define types in `src/types/index.ts`
2. Add validation schemas in `src/validations/`
3. Write service logic in `src/services/`
4. Create thin controller in `src/controllers/`
5. Wire routes in `src/routes/`
6. Register routes in `src/main.ts`
