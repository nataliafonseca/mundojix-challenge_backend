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

export class ListAllDocumentsUseCase {
  async execute(): Promise<Document[]> {
    const documents = await prismaClient.document.findMany({
      include: { user: true }
    });

    return documents;
  }
}
