import { NextFunction, Request, Response } from 'express';
import { ListUserDocumentsUseCase } from './ListUserDocumentsUseCase';

export class ListUserDocumentsController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const listUserDocumentsUseCase = new ListUserDocumentsUseCase();
    const user_id = request.user.id;

    try {
      const documents = await listUserDocumentsUseCase.execute(user_id);
      return response.status(200).json(documents);
    } catch (err) {
      next(err);
    }
  }
}
