export interface Ticket {
  id: number;
  seatNumber: number;
  status: 'OPEN' | 'CLOSED';
  firstName?: string;
  lastName?: string;
  email?: string;
  bookedAt?: string;
}

export type TicketAction =
  | { type: 'INIT_TICKETS'; payload: Ticket[] }
  | { type: 'BOOK_TICKET'; payload: { seatNumber: number; firstName: string; lastName: string; email: string } }
  | { type: 'RELEASE_TICKET'; payload: { seatNumber: number } }
  | { type: 'UPDATE_PASSENGER'; payload: { seatNumber: number; firstName: string; lastName: string; email: string } };
