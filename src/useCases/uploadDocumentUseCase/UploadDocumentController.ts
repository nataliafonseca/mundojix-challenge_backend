import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { UploadDocumentUseCase } from './UploadDocumentUseCase';

type FileResponse = {
  path?: string;
  location?: string;
};

export class UploadDocumentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file: FileResponse = request.file;
    const { document_id } = request.body;

    const uploadDocumentUseCase = new UploadDocumentUseCase();

    try {
      const document = await uploadDocumentUseCase.execute({
        document_id,
        pdf: file.location ? file.location : file.path
      });

      return response.status(200).json(document);
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
