import { NextFunction, Request, Response } from 'express';
import { ListAllDocumentsUseCase } from './ListAllDocumentsUseCase';

export class ListAllDocumentsController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const listAllDocumentsUseCase = new ListAllDocumentsUseCase();
    const { page = 1, per_page = 10 } = request.query;

    try {
      const documents = await listAllDocumentsUseCase.execute();

      const total = documents.length;

      const pageStart = (Number(page) - 1) * Number(per_page);
      const pageEnd = pageStart + Number(per_page);

      const documentsOnPage = documents.slice(pageStart, pageEnd);

      response.setHeader('X-Total-Count', total.toString());

      return response.status(200).json(documentsOnPage);
    } catch (err) {
      next(err);
    }
  }
}
