import { NextFunction, Request, Response } from 'express';
import { ApproveDocumentUseCase } from './ApproveDocumentUseCase';

export class ApproveDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { document_id } = request.body;

    const approveDocumentUseCase = new ApproveDocumentUseCase();

    try {
      const document = await approveDocumentUseCase.execute(document_id);

      return response.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }
}
