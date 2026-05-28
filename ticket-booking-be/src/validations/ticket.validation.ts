import { z } from 'zod';

export const bookTicketSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

export const seatNumberSchema = z
  .number()
  .int('Seat number must be an integer')
  .min(1, 'Seat number must be between 1 and 40')
  .max(40, 'Seat number must be between 1 and 40');

/**
 * Parse and validate the seatNumber path parameter.
 * Returns the parsed number or throws a Zod error.
 */
export function validateSeatNumber(seatNumberRaw: string): number {
  const parsed = parseInt(seatNumberRaw, 10);
  if (isNaN(parsed)) {
    throw new z.ZodError([
      {
        code: 'custom',
        message: 'Seat number must be a valid integer between 1 and 40',
        path: ['seatNumber'],
      },
    ]);
  }
  return seatNumberSchema.parse(parsed);
}
