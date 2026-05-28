---
name: cron-jobs
description: Scheduled job patterns using node-cron for the Bus Ticket Booking backend. Covers cron setup, daily report pattern, and best practices. Use when adding or modifying scheduled tasks.
---

# Cron Jobs Skill

## Location

All cron jobs live in `src/crons/`. Each cron file exports a start function.

## Setup Pattern

```typescript
import cron from 'node-cron';
import { logger } from '../utils/logger';

export function startDailyReportCron(): void {
  cron.schedule('0 0 * * *', async () => {
    // Job logic here
    logger.info('[Daily Report] ...');
  });
  logger.info('Daily report cron job scheduled.');
}
```

## Registration

Cron jobs are started in `main.ts` inside the `app.listen()` callback:

```typescript
app.listen(config.port, () => {
  registerEventListeners();
  startDailyReportCron(); // ← Register here
});
```

## Cron Expression Reference

| Expression | Schedule |
|-----------|----------|
| `0 0 * * *` | Every day at midnight |
| `*/5 * * * *` | Every 5 minutes |
| `0 */6 * * *` | Every 6 hours |
| `0 9 * * 1-5` | 9 AM weekdays |

## Best Practices

- Wrap cron logic in try/catch to prevent crashes
- Use `logger` for all cron output (not raw console)
- Create one file per cron job for clarity
- Export a named `start*Cron()` function
