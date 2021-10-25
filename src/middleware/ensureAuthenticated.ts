import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { prismaClient } from '../prisma';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Falha de autenticação', 401);
    }

    const [, token] = authHeader.split(' ');

    const { sub: userId } = verify(token, process.env.JWT_SECRET) as IPayload;

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError('Falha de autenticação', 401);
    }

    request.user = { id: user.id };

    next();
  } catch (err) {
    next(err);
  }
}
