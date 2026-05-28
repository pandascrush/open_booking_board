---
name: data-persistence
description: localStorage read/write patterns and data initialization for the Bus Ticket Booking frontend. Covers ticket data persistence, initialization strategy, and sync patterns. Use when modifying data storage or adding new persisted data.
---

# Data Persistence Skill

## Storage Key

All ticket data is stored under the key `"bus_tickets"` in localStorage.

## Utility Functions (`src/utils/localStorage.ts`)

### `loadTickets(): Ticket[] | null`
Reads and parses tickets from localStorage. Returns `null` if no data or parse error.

### `saveTickets(tickets: Ticket[]): void`
Serializes and saves tickets to localStorage.

### `initializeTickets(): Ticket[]`
Called on app startup. If localStorage has 40 tickets, returns them. Otherwise, creates 40 OPEN tickets and saves.

## Initialization Flow

```
App Mount → TicketProvider → useEffect → initializeTickets()
  ├── localStorage has 40 tickets → use existing data
  └── localStorage empty/invalid → create 40 OPEN tickets, save, return
```

## Sync Strategy

The reducer in `TicketContext.tsx` calls `saveTickets(newState)` after every state change. This means:

- **Every dispatch automatically persists to localStorage**
- No separate sync logic needed
- Data survives page reloads

## Data Shape in localStorage

```json
[
  { "id": 1, "seatNumber": 1, "status": "OPEN" },
  { "id": 2, "seatNumber": 2, "status": "CLOSED", "firstName": "John", "lastName": "Doe", "email": "john@example.com", "bookedAt": "2024-01-15T10:30:00.000Z" },
  ...
]
```

## Adding New Persisted Data

1. Add to the `Ticket` interface in `src/types/index.ts`
2. Update the relevant reducer case in `TicketContext.tsx`
3. `saveTickets()` will automatically persist the changes
