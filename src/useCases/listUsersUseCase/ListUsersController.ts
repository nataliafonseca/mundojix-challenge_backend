import { NextFunction, Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const listUsersUseCase = new ListUsersUseCase();

    try {
      const users = await listUsersUseCase.execute();
      return response.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}
