// ── Ticket Status ────────────────────────────────────────────
export enum TicketStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

// ── Event Names ─────────────────────────────────────────────
export const EventNames = {
  TICKET_BOOKED: 'TICKET_BOOKED',
  TICKET_RELEASED: 'TICKET_RELEASED',
  SERVER_RESET: 'SERVER_RESET',
} as const;

// ── Seat Configuration ──────────────────────────────────────
export const TOTAL_SEATS = 40;
export const MIN_SEAT_NUMBER = 1;
export const MAX_SEAT_NUMBER = 40;
