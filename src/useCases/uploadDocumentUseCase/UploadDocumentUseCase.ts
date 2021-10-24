import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';

type Document = {
  id: string;
  description: string;
  pdf: string;
  hours: number;
  type: string;
  status: boolean;
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
    const documentExists = await prismaClient.document.findFirst({
      where: { id: document_id }
    });

    if (!documentExists) {
      throw new AppError('O documento não existe.');
    }

    const document = await prismaClient.document.update({
      where: { id: document_id },
      data: { pdf }
    });

    return document;
  }
}
