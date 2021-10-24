import { NextFunction, Request, Response } from 'express';
import { ListAllDocumentsUseCase } from './ListAllDocumentsUseCase';

export class ListAllDocumentsController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const listAllDocumentsUseCase = new ListAllDocumentsUseCase();

    try {
      const documents = await listAllDocumentsUseCase.execute();
      return response.status(200).json(documents);
    } catch (err) {
      next(err);
    }
  }
}
