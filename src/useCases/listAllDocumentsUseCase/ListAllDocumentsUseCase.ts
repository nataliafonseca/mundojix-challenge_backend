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
  async execute(status: number): Promise<Document[]> {
    if (status === 3) {
      const documents = await prismaClient.document.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return documents;
    } else if (status === 2) {
      const documents = await prismaClient.document.findMany({
        where: { status: 2 },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return documents;
    } else if (status === 1) {
      const documents = await prismaClient.document.findMany({
        where: { status: 1 },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return documents;
    } else {
      const documents = await prismaClient.document.findMany({
        where: { status: 0 },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return documents;
    }
  }
}
