import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500).render('error', {
    message:
      err instanceof ValidationError ? err.message : 'Sorry, try again later',
  });
};
