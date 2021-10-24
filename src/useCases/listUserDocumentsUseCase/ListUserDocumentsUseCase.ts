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

export class ListUserDocumentsUseCase {
  async execute(user_id: string): Promise<Document[]> {
    const documents = await prismaClient.document.findMany({
      where: { user_id: user_id },
      include: { user: true }
    });

    return documents;
  }
}
