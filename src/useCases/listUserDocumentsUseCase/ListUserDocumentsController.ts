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
    const { page = 1, per_page = 10, status = 3 } = request.query;

    try {
      const documents = await listUserDocumentsUseCase.execute({
        user_id,
        status: Number(status)
      });

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
