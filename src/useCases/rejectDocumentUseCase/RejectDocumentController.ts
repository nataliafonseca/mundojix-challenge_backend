import { NextFunction, Request, Response } from 'express';
import { RejectDocumentUseCase } from './RejectDocumentUseCase';

export class RejectDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { document_id } = request.body;

    const rejectDocumentUseCase = new RejectDocumentUseCase();

    try {
      const document = await rejectDocumentUseCase.execute(document_id);

      return response.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }
}
