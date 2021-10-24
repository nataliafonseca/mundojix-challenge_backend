import { Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = new ListUsersUseCase();
    const categories = await listUserUseCase.execute();

    return response.status(200).json(categories);
  }
}
