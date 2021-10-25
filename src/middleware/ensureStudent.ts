import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { prismaClient } from '../prisma';

export async function ensureStudent(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const user = await prismaClient.user.findFirst({
    where: {
      id: id
    }
  });

  if (user.role !== 'student') {
    next(new AppError('Operação proibida', 403));
  }

  return next();
}
