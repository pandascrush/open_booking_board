import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/response';
import { bookTicketSchema, validateSeatNumber } from '../validations/ticket.validation';
import * as ticketService from '../services/ticket.service';

interface SeatParams {
  seatNumber: string;
}

// ── GET /api/v1/tickets ─────────────────────────────────────
export async function getAllTickets(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tickets = await ticketService.getAllTickets();
    sendSuccess(res, 'All tickets retrieved successfully', tickets);
  } catch (error) {
    next(error);
  }
}

// ── GET /api/v1/tickets/open ────────────────────────────────
export async function getOpenTickets(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tickets = await ticketService.getOpenTickets();
    sendSuccess(res, 'Open tickets retrieved successfully', tickets);
  } catch (error) {
    next(error);
  }
}

// ── GET /api/v1/tickets/closed ──────────────────────────────
export async function getClosedTickets(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tickets = await ticketService.getClosedTickets();
    sendSuccess(res, 'Closed tickets retrieved successfully', tickets);
  } catch (error) {
    next(error);
  }
}

// ── GET /api/v1/tickets/:seatNumber ─────────────────────────
export async function getTicketBySeatNumber(req: Request<SeatParams>, res: Response, next: NextFunction): Promise<void> {
  try {
    const seatNumber = validateSeatNumber(req.params.seatNumber);
    const ticket = await ticketService.getTicketBySeatNumber(seatNumber);
    sendSuccess(res, `Ticket for seat #${seatNumber} retrieved successfully`, ticket);
  } catch (error) {
    next(error);
  }
}

// ── POST /api/v1/tickets/:seatNumber/book ───────────────────
export async function bookTicket(req: Request<SeatParams>, res: Response, next: NextFunction): Promise<void> {
  try {
    const seatNumber = validateSeatNumber(req.params.seatNumber);
    const body = bookTicketSchema.parse(req.body);
    const ticket = await ticketService.bookTicket(seatNumber, body);
    sendSuccess(res, `Seat #${seatNumber} booked successfully`, ticket, 201);
  } catch (error) {
    next(error);
  }
}

// ── DELETE /api/v1/tickets/:seatNumber/release ──────────────
export async function releaseTicket(req: Request<SeatParams>, res: Response, next: NextFunction): Promise<void> {
  try {
    const seatNumber = validateSeatNumber(req.params.seatNumber);
    const ticket = await ticketService.releaseTicket(seatNumber);
    sendSuccess(res, `Seat #${seatNumber} released successfully`, ticket);
  } catch (error) {
    next(error);
  }
}

// ── PUT /api/v1/tickets/:seatNumber ──────────────────────────
export async function updateTicket(req: Request<SeatParams>, res: Response, next: NextFunction): Promise<void> {
  try {
    const seatNumber = validateSeatNumber(req.params.seatNumber);
    const body = bookTicketSchema.parse(req.body);
    const ticket = await ticketService.updateTicketDetails(seatNumber, body);
    sendSuccess(res, `Ticket for seat #${seatNumber} updated successfully`, ticket);
  } catch (error) {
    next(error);
  }
}
