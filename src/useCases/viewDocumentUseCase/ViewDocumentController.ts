import { NextFunction, Request, Response } from 'express';
import { ViewDocumentUseCase } from './ViewDocumentUseCase';

export class ViewDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const viewDocumentUseCase = new ViewDocumentUseCase();
    const { id: document_id } = request.params;
    const { id: user_id } = request.user;

    try {
      const document = await viewDocumentUseCase.execute({
        document_id,
        user_id
      });

      return response.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }
}
