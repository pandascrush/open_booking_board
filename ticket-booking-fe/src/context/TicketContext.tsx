import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Ticket, TicketAction } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET as string;

interface TicketContextType {
  tickets: Ticket[];
  fetchTickets: () => Promise<void>;
  bookSeat: (seatNumber: number, firstName: string, lastName: string, email: string) => Promise<{ success: boolean; message?: string }>;
  releaseSeat: (seatNumber: number) => Promise<{ success: boolean; message?: string }>;
  updatePassenger: (seatNumber: number, firstName: string, lastName: string, email: string) => Promise<{ success: boolean; message?: string }>;
  resetAll: () => Promise<{ success: boolean; message?: string }>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

function ticketReducer(state: Ticket[], action: TicketAction): Ticket[] {
  switch (action.type) {
    case 'INIT_TICKETS':
      return action.payload;

    case 'BOOK_TICKET':
      return state.map((ticket) =>
        ticket.seatNumber === action.payload.seatNumber
          ? {
              ...ticket,
              status: 'CLOSED' as const,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              email: action.payload.email,
              bookedAt: new Date().toISOString(),
            }
          : ticket
      );

    case 'RELEASE_TICKET':
      return state.map((ticket) =>
        ticket.seatNumber === action.payload.seatNumber
          ? {
              ...ticket,
              status: 'OPEN' as const,
              firstName: undefined,
              lastName: undefined,
              email: undefined,
              bookedAt: undefined,
            }
          : ticket
      );

    case 'UPDATE_PASSENGER':
      return state.map((ticket) =>
        ticket.seatNumber === action.payload.seatNumber
          ? {
              ...ticket,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              email: action.payload.email,
            }
          : ticket
      );

    default:
      return state;
  }
}

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, dispatch] = useReducer(ticketReducer, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tickets`);
      const res = await response.json();
      if (res.success) {
        dispatch({ type: 'INIT_TICKETS', payload: res.data });
      }
    } catch (error) {
      console.error('Fetch tickets error:', error);
    }
  };

  const bookSeat = async (seatNumber: number, firstName: string, lastName: string, email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${seatNumber}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const res = await response.json();
      if (res.success) {
        dispatch({
          type: 'BOOK_TICKET',
          payload: { seatNumber, firstName, lastName, email },
        });
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: 'Network error booking ticket' };
    }
  };

  const releaseSeat = async (seatNumber: number) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${seatNumber}/release`, {
        method: 'DELETE',
      });
      const res = await response.json();
      if (res.success) {
        dispatch({ type: 'RELEASE_TICKET', payload: { seatNumber } });
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: 'Network error releasing ticket' };
    }
  };

  const updatePassenger = async (seatNumber: number, firstName: string, lastName: string, email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${seatNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const res = await response.json();
      if (res.success) {
        dispatch({
          type: 'UPDATE_PASSENGER',
          payload: { seatNumber, firstName, lastName, email },
        });
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: 'Network error updating passenger details' };
    }
  };

  const resetAll = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/reset`, {
        method: 'POST',
        headers: {
          'x-admin-secret': ADMIN_SECRET,
        },
      });
      const res = await response.json();
      if (res.success) {
        await fetchTickets();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      return { success: false, message: 'Network error resetting server' };
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, fetchTickets, bookSeat, releaseSeat, updatePassenger, resetAll }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets(): TicketContextType {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
