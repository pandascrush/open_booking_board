---
name: event-system
description: EventEmitter singleton pattern for the Bus Ticket Booking backend. Covers domain event naming, emission from services, and listener registration. Use when adding new domain events or modifying event-driven workflows.
---

# Event System Skill

## Architecture

The system uses Node.js built-in `EventEmitter` as a singleton for internal domain events.

### Event Emitter Singleton (`src/utils/eventEmitter.ts`)
```typescript
class AppEventEmitter extends EventEmitter {
  private static instance: AppEventEmitter;
  public static getInstance(): AppEventEmitter { ... }
}
export const appEventEmitter = AppEventEmitter.getInstance();
```

## Event Names

Defined as constants in `src/constants/index.ts`:

| Event | Payload | When Emitted |
|-------|---------|--------------|
| `TICKET_BOOKED` | `{ seatNumber, email }` | After successful booking |
| `TICKET_RELEASED` | `{ seatNumber }` | After releasing a seat |
| `SERVER_RESET` | `{ resetAt: ISO string }` | After admin reset |

## Emission Rules

1. **Always emit AFTER successful DB write** — never before
2. **Emit from services only** — not from controllers or routes
3. **Use typed payloads** from `src/types/index.ts`

```typescript
// In service function, after prisma.ticket.update()
appEventEmitter.emit(EventNames.TICKET_BOOKED, { seatNumber, email });
```

## Listener Registration

Register all listeners in `registerEventListeners()` called from `main.ts` at startup:

```typescript
appEventEmitter.on(EventNames.TICKET_BOOKED, (payload) => {
  logger.info(`Ticket booked: seat #${payload.seatNumber} by ${payload.email}`);
});
```

## Adding New Events

1. Add event name to `EventNames` in `src/constants/index.ts`
2. Define payload interface in `src/types/index.ts`
3. Emit from the relevant service function
4. Register listener in `registerEventListeners()`
