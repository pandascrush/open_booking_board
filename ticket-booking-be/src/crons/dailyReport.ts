import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

/**
 * Daily report cron job.
 * Runs every day at midnight and logs a summary of OPEN and CLOSED seats.
 */
export function startDailyReportCron(): void {
  cron.schedule('0 0 * * *', async () => {
    try {
      const openCount = await prisma.ticket.count({
        where: { status: 'OPEN' },
      });
      const closedCount = await prisma.ticket.count({
        where: { status: 'CLOSED' },
      });

      logger.info(
        `[Daily Report] Total OPEN seats: ${openCount} | Total CLOSED seats: ${closedCount}`
      );
    } catch (error) {
      logger.error(`[Daily Report] Failed to generate report: ${(error as Error).message}`);
    }
  });

  logger.info('Daily report cron job scheduled (runs at midnight).');
}
