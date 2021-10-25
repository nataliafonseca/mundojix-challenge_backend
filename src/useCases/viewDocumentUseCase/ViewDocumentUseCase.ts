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

type ViewDocumentRequest = {
  document_id: string;
  user_id: string;
};

export class ViewDocumentUseCase {
  async execute({
    document_id,
    user_id
  }: ViewDocumentRequest): Promise<Document> {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id }
    });

    const document = await prismaClient.document.findFirst({
      where: { id: document_id },
      include: { user: true }
    });

    if (!(user_id === document.user_id || user.role === 'admin')) {
      throw new AppError('Operação proibida', 403);
    }

    return document;
  }
}
