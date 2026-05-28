import { Router } from 'express';
import * as ticketController from '../controllers/ticket.controller';

const router = Router();

// GET /api/v1/tickets
router.get('/', ticketController.getAllTickets);

// GET /api/v1/tickets/open
router.get('/open', ticketController.getOpenTickets);

// GET /api/v1/tickets/closed
router.get('/closed', ticketController.getClosedTickets);

// GET /api/v1/tickets/:seatNumber
router.get('/:seatNumber', ticketController.getTicketBySeatNumber);

// POST /api/v1/tickets/:seatNumber/book
router.post('/:seatNumber/book', ticketController.bookTicket);

// PUT /api/v1/tickets/:seatNumber
router.put('/:seatNumber', ticketController.updateTicket);

// DELETE /api/v1/tickets/:seatNumber/release
router.delete('/:seatNumber/release', ticketController.releaseTicket);

export default router;