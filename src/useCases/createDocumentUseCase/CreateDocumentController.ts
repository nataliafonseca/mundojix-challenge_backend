import { NextFunction, Request, Response } from 'express';
import { CreateDocumentUseCase } from './CreateDocumentUseCase';

export class CreateDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { description, hours, type } = request.body;
    const { id: user_id } = request.user;

    const createDocumentUseCase = new CreateDocumentUseCase();

    try {
      const document = await createDocumentUseCase.execute({
        description,
        hours,
        type,
        user_id,
        pdf: ''
      });

      return response.status(201).json(document);
    } catch (err) {
      next(err);
    }
  }
}
