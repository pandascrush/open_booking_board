---
name: state-management
description: Context + useReducer state management pattern for the Bus Ticket Booking frontend. Covers TicketContext, action types, reducer logic, and localStorage sync. Use when modifying global state or adding new actions.
---

# State Management Skill

## Architecture

Global state uses React Context + `useReducer` in `src/context/TicketContext.tsx`.

## Context Structure

```typescript
interface TicketContextType {
  tickets: Ticket[];
  dispatch: React.Dispatch<TicketAction>;
}
```

## Action Types

| Action | Payload | Effect |
|--------|---------|--------|
| `INIT_TICKETS` | `Ticket[]` | Load initial tickets |
| `BOOK_TICKET` | `{ seatNumber, firstName, lastName, email }` | Mark seat CLOSED with passenger data |
| `RELEASE_TICKET` | `{ seatNumber }` | Mark seat OPEN, clear data |
| `UPDATE_PASSENGER` | `{ seatNumber, firstName, lastName, email }` | Update passenger details only |

## Reducer Pattern

```typescript
function ticketReducer(state: Ticket[], action: TicketAction): Ticket[] {
  let newState: Ticket[];
  switch (action.type) {
    case 'BOOK_TICKET':
      newState = state.map(ticket =>
        ticket.seatNumber === action.payload.seatNumber
          ? { ...ticket, status: 'CLOSED', ...action.payload, bookedAt: new Date().toISOString() }
          : ticket
      );
      break;
    // ...
  }
  saveTickets(newState); // Sync to localStorage
  return newState;
}
```

## Key Rule: localStorage Sync

**Every reducer case must call `saveTickets(newState)` before returning.** This ensures localStorage is always in sync with React state.

## Using the Context

```typescript
import { useTickets } from '../context/TicketContext';

function MyComponent() {
  const { tickets, dispatch } = useTickets();
  
  dispatch({ type: 'BOOK_TICKET', payload: { seatNumber: 5, ... } });
}
```

## Adding New Actions

1. Add type to `TicketAction` union in `src/types/index.ts`
2. Add case to `ticketReducer` in `TicketContext.tsx`
3. Remember to sync to localStorage
