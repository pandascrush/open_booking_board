import { EventEmitter } from 'events';
import { EventNames } from '../constants';
import { logger } from './logger';
import type { TicketBookedPayload, TicketReleasedPayload, ServerResetPayload } from '../types';

class AppEventEmitter extends EventEmitter {
  private static instance: AppEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): AppEventEmitter {
    if (!AppEventEmitter.instance) {
      AppEventEmitter.instance = new AppEventEmitter();
    }
    return AppEventEmitter.instance;
  }
}

export const appEventEmitter = AppEventEmitter.getInstance();

/**
 * Register all event listeners. Called once at app startup (main.ts).
 */
export function registerEventListeners(): void {
  appEventEmitter.on(EventNames.TICKET_BOOKED, (payload: TicketBookedPayload) => {
    logger.info(`Ticket booked: seat #${payload.seatNumber} by ${payload.email}`);
  });

  appEventEmitter.on(EventNames.TICKET_RELEASED, (payload: TicketReleasedPayload) => {
    logger.info(`Ticket released: seat #${payload.seatNumber}`);
  });

  appEventEmitter.on(EventNames.SERVER_RESET, (payload: ServerResetPayload) => {
    logger.info(`Admin reset triggered at ${payload.resetAt}. All 40 tickets reopened.`);
  });

  logger.info('Event listeners registered successfully.');
}
