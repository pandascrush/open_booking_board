export type TicketStatus = 'OPEN' | 'CLOSED';

// ── Request DTOs ────────────────────────────────────────────
export interface BookTicketDto {
  firstName: string;
  lastName: string;
  email: string;
}

// ── Response DTOs ───────────────────────────────────────────
export interface TicketResponse {
  id: number;
  seatNumber: number;
  status: TicketStatus;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  bookedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

// ── Event Payloads ──────────────────────────────────────────
export interface TicketBookedPayload {
  seatNumber: number;
  email: string;
}

// ── Event Payloads ──────────────────────────────────────────
export interface TicketReleasedPayload {
  seatNumber: number;
}

export interface ServerResetPayload {
  resetAt: string;
}
