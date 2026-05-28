import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { sendError } from '../utils/response';

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const adminSecret = req.headers['x-admin-secret'] as string | undefined;

  if (!adminSecret || adminSecret !== config.adminSecret) {
    sendError(res, 'Unauthorized: Invalid or missing admin secret', 401);
    return;
  }

  next();
}
