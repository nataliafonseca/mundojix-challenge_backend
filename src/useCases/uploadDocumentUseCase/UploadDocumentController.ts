import { NextFunction, Request, Response } from 'express';
import { UploadDocumentUseCase } from './UploadDocumentUseCase';

type FileResponse = {
  path?: string;
  location?: string;
};

export class UploadDocumentController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const file: FileResponse = request.file;
    const { id: document_id } = request.params;

    const uploadDocumentUseCase = new UploadDocumentUseCase();

    try {
      const document = await uploadDocumentUseCase.execute({
        document_id,
        pdf: file.location ? file.location : file.path
      });

      return response.status(200).json(document);
    } catch (err) {
      next(err);
    }
  }
}
