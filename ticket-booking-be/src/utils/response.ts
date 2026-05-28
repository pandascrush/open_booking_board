import { Response } from 'express';
import type { ApiResponse } from '../types';

export function sendSuccess<T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = 200
): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 500
): void {
  const response: ApiResponse = {
    success: false,
    message,
    statusCode,
  };
  res.status(statusCode).json(response);
}
