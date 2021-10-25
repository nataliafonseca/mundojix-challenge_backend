import { NextFunction, Request, Response } from 'express';
import { DeleteDocumentUseCase } from './DeleteDocumentUseCase';

export class DeleteDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const deleteDocumentUseCase = new DeleteDocumentUseCase();
    const { id: document_id } = request.params;
    const { id: user_id } = request.user;

    try {
      const document = await deleteDocumentUseCase.execute({
        document_id,
        user_id
      });

      return response.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }
}
