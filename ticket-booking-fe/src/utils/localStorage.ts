import type { Ticket } from '../types';

const STORAGE_KEY = 'bus_tickets';

export function loadTickets(): Ticket[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as Ticket[];
  } catch {
    return null;
  }
}

export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function initializeTickets(): Ticket[] {
  const existing = loadTickets();
  if (existing && existing.length === 40) {
    return existing;
  }

  const tickets: Ticket[] = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    seatNumber: i + 1,
    status: 'OPEN' as const,
  }));

  saveTickets(tickets);
  return tickets;
}
