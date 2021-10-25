import { AppError } from '../../errors/AppError';
import { prismaClient } from '../../prisma';

type Document = {
  id: string;
  description: string;
  pdf: string;
  hours: number;
  type: string;
  status: number;
  user_id: string;
  createdAt: Date;
};

type UploadDocumentRequest = {
  document_id: string;
  pdf: string;
};

export class UploadDocumentUseCase {
  async execute({
    document_id,
    pdf
  }: UploadDocumentRequest): Promise<Document> {
    let document = await prismaClient.document.findFirst({
      where: { id: document_id }
    });

    if (!document) {
      throw new AppError('O documento não existe.');
    }

    if (document.status !== 0) {
      throw new AppError(
        'Documento já homologado, não é possível realizar alterações.'
      );
    }

    document = await prismaClient.document.update({
      where: { id: document_id },
      data: { pdf }
    });

    return document;
  }
}
