import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/response';
import * as ticketService from '../services/ticket.service';

// ── POST /api/v1/admin/reset ────────────────────────────────
export async function resetAllTickets(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const count = await ticketService.resetAllTickets();
    sendSuccess(res, `All tickets reset to OPEN successfully`, { ticketsReset: count });
  } catch (error) {
    next(error);
  }
}
