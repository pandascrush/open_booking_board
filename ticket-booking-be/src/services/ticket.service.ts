import { PrismaClient } from '@prisma/client';
import { EventNames } from '../constants';
import { appEventEmitter } from '../utils/eventEmitter';
import { logger } from '../utils/logger';
import type { BookTicketDto, TicketBookedPayload, TicketReleasedPayload, ServerResetPayload } from '../types';

const prisma = new PrismaClient();

/**
 * Custom error class with HTTP status code.
 */
class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

// ── Get All Tickets ─────────────────────────────────────────
export async function getAllTickets() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { seatNumber: 'asc' },
  });
  return tickets;
}

// ── Get Open Tickets ────────────────────────────────────────
export async function getOpenTickets() {
  const tickets = await prisma.ticket.findMany({
    where: { status: 'OPEN' },
    orderBy: { seatNumber: 'asc' },
  });
  return tickets;
}

// ── Get Closed Tickets ──────────────────────────────────────
export async function getClosedTickets() {
  const tickets = await prisma.ticket.findMany({
    where: { status: 'CLOSED' },
    orderBy: { seatNumber: 'asc' },
  });
  return tickets;
}

// ── Get Ticket By Seat Number ───────────────────────────────
export async function getTicketBySeatNumber(seatNumber: number) {
  const ticket = await prisma.ticket.findUnique({
    where: { seatNumber },
  });

  if (!ticket) {
    throw new HttpError(`Ticket with seat number ${seatNumber} not found`, 404);
  }

  return ticket;
}

// ── Book a Ticket ───────────────────────────────────────────
export async function bookTicket(seatNumber: number, data: BookTicketDto) {
  const ticket = await prisma.ticket.findUnique({
    where: { seatNumber },
  });

  if (!ticket) {
    throw new HttpError(`Ticket with seat number ${seatNumber} not found`, 404);
  }

  if (ticket.status === 'CLOSED') {
    throw new HttpError(`Seat #${seatNumber} is already booked`, 409);
  }

  const updatedTicket = await prisma.ticket.update({
    where: { seatNumber },
    data: {
      status: 'CLOSED',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bookedAt: new Date(),
    },
  });

  // Emit event after successful DB write
  const payload: TicketBookedPayload = {
    seatNumber,
    email: data.email,
  };
  appEventEmitter.emit(EventNames.TICKET_BOOKED, payload);

  return updatedTicket;
}

// ── Release a Ticket ────────────────────────────────────────
export async function releaseTicket(seatNumber: number) {
  const ticket = await prisma.ticket.findUnique({
    where: { seatNumber },
  });

  if (!ticket) {
    throw new HttpError(`Ticket with seat number ${seatNumber} not found`, 404);
  }

  if (ticket.status === 'OPEN') {
    throw new HttpError(`Seat #${seatNumber} is already open`, 400);
  }

  const updatedTicket = await prisma.ticket.update({
    where: { seatNumber },
    data: {
      status: 'OPEN',
      firstName: null,
      lastName: null,
      email: null,
      bookedAt: null,
    },
  });

  // Emit event after successful DB write
  const payload: TicketReleasedPayload = { seatNumber };
  appEventEmitter.emit(EventNames.TICKET_RELEASED, payload);

  return updatedTicket;
}

// ── Reset All Tickets (Admin) ───────────────────────────────
export async function resetAllTickets() {
  const result = await prisma.ticket.updateMany({
    data: {
      status: 'OPEN',
      firstName: null,
      lastName: null,
      email: null,
      bookedAt: null,
    },
  });

  // Emit event after successful DB write
  const payload: ServerResetPayload = {
    resetAt: new Date().toISOString(),
  };
  appEventEmitter.emit(EventNames.SERVER_RESET, payload);

  logger.info(`Admin reset: ${result.count} tickets reset to OPEN.`);

  return result.count;
}

// ── Update Ticket Details ────────────────────────────────────
export async function updateTicketDetails(seatNumber: number, data: BookTicketDto) {
  const ticket = await prisma.ticket.findUnique({
    where: { seatNumber },
  });

  if (!ticket) {
    throw new HttpError(`Ticket with seat number ${seatNumber} not found`, 404);
  }

  const updatedTicket = await prisma.ticket.update({
    where: { seatNumber },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  });

  return updatedTicket;
}
