import { NextFunction, Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const listUserUseCase = new ListUsersUseCase();

    try {
      const categories = await listUserUseCase.execute();
      return response.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
}
