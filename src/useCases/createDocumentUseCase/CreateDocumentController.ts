import { NextFunction, Request, Response } from 'express';
import { CreateDocumentUseCase } from './CreateDocumentUseCase';

export class CreateDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { description, hours, type, user_id } = request.body;

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
