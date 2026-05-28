import express from 'express';
import cors from 'cors';
import { config } from './config';
import { logger } from './utils/logger';
import { registerEventListeners } from './utils/eventEmitter';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import ticketRoutes from './routes/ticket.routes';
import adminRoutes from './routes/admin.routes';
import { startDailyReportCron } from './crons/dailyReport';

const app = express();

// ── Global Middlewares ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ── Routes ──────────────────────────────────────────────────
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/admin', adminRoutes);

// ── Health Check ────────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'Bus Ticket Booking API is running', timestamp: new Date().toISOString() });
});

// ── Error Handler (must be last middleware) ──────────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────
app.listen(config.port, () => {
  logger.info(`🚌 Bus Ticket Booking API running on http://localhost:${config.port}`);

  // Register domain event listeners
  registerEventListeners();

  // Start cron jobs
  startDailyReportCron();
});

export default app;
