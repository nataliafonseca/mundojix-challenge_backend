import { CreateDocumentUseCase } from './CreateDocumentUseCase';
import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';

export class CreateDocumentController {
  async handle(request: Request, response: Response): Promise<Response> {
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
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          Error: err.message
        });
      }
      return response.status(500).json({
        Error: `Internal server error - ${err.message}`
      });
    }
  }
}
