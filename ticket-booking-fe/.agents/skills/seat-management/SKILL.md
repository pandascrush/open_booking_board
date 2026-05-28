---
name: seat-management
description: Seat map grid layout and seat state management for the Bus Ticket Booking frontend. Covers deck layout, seat visual states, selection flow, and booking workflow. Use when modifying the seat map or booking interaction.
---

# Seat Management Skill

## Seat Layout

The bus has 40 seats split into two decks:
- **Lower Deck**: Seats 1–20
- **Upper Deck**: Seats 21–40

Each deck has 5 rows:
- Rows 1–4: 4 seats (2 left + aisle + 2 right)
- Row 5: Back bench (4 seats spanning full width)

## Seat States

| State | Color | Cursor | Behavior |
|-------|-------|--------|----------|
| OPEN | `var(--color-open)` / `#2ECC71` | pointer | Clickable, selects seat |
| CLOSED | `var(--color-closed)` / `#4A4A6A` | not-allowed | Not clickable, opacity 0.7 |
| SELECTED | `var(--color-accent)` / `#E94560` | pointer | Highlighted, shows booking form |

## Booking Flow

1. User clicks OPEN seat → seat becomes SELECTED
2. BookingForm slides in below the seat map
3. User fills in firstName, lastName, email
4. "Confirm Reservation" → validates → dispatches `BOOK_TICKET`
5. Toast shows success → seat re-renders as CLOSED
6. Form hides, selection clears
7. "Cancel" → deselects seat, hides form

## Seat Component Props

```typescript
interface SeatProps {
  seatNumber: number;
  status: 'OPEN' | 'CLOSED';
  isSelected: boolean;
  onSelect: (seatNumber: number) => void;
}
```

## Selection Logic (in ReservationPage)

- Clicking same seat toggles selection off
- Clicking different seat switches selection
- CLOSED seats do nothing on click
