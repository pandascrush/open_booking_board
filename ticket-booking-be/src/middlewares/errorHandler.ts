import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

/**
 * Global error handler middleware.
 * Maps known error types to appropriate HTTP status codes.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error(`${err.name}: ${err.message}`);

  // ── Zod Validation Error → 422 ────────────────────────────
  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
    res.status(422).json({
      success: false,
      message: messages,
      statusCode: 422,
    });
    return;
  }

  // ── Prisma Not Found (P2025) → 404 ────────────────────────
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.status(404).json({
      success: false,
      message: 'Resource not found',
      statusCode: 404,
    });
    return;
  }

  // ── Custom HTTP errors (thrown by services) ────────────────
  if ('statusCode' in err) {
    const statusCode = (err as Error & { statusCode: number }).statusCode;
    res.status(statusCode).json({
      success: false,
      message: err.message,
      statusCode,
    });
    return;
  }

  // ── Fallback → 500 ────────────────────────────────────────
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    statusCode: 500,
  });
}
