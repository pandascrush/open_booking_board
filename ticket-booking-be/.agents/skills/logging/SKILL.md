---
name: logging
description: Logger utility and request logging patterns for the Bus Ticket Booking backend. Covers console wrapper with timestamps, file logging to logs/ directory, and request logger middleware. Use when adding logging or modifying log output.
---

# Logging Skill

## Logger Utility (`src/utils/logger.ts`)

A simple wrapper around `console` that adds timestamps and writes to `logs/` directory.

### API
```typescript
logger.info('Server started on port 3000');
logger.warn('Deprecated endpoint called');
logger.error('Failed to connect to database');
logger.debug('Query result: ...');
```

### Output Format
```
[2024-01-15T10:30:00.000Z] [INFO] Server started on port 3000
```

### File Logging
- Logs are written to `logs/<date>.log` (e.g., `logs/2024-01-15.log`)
- The `logs/` directory is auto-created if it doesn't exist
- Each line is appended to the daily log file

## Request Logger Middleware

Logs every HTTP request with method, path, status code, and response time:

```typescript
// Output example:
// [INFO] GET /api/v1/tickets 200 45ms
```

Registered as global middleware in `main.ts` (before routes).

## Logging Best Practices

- Use `logger.info()` for normal operations and events
- Use `logger.warn()` for deprecated features or near-limit conditions
- Use `logger.error()` for failures and exceptions
- Log event emissions in event listeners
- Log cron job results
