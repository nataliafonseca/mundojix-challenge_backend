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

type CreateDocumentRequest = Omit<Document, 'id' | 'status' | 'createdAt'>;

export class CreateDocumentUseCase {
  async execute({
    description,
    pdf,
    hours,
    type,
    user_id
  }: CreateDocumentRequest): Promise<Document> {
    const user = await prismaClient.user.findFirst({ where: { id: user_id } });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const document = await prismaClient.document.create({
      data: {
        description,
        pdf,
        hours,
        type,
        user_id
      }
    });

    return document;
  }
}
