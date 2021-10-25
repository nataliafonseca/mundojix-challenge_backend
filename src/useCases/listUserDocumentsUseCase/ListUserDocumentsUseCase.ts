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

type ListUserDocumentsRequest = {
  user_id: string;
  status: number;
};

export class ListUserDocumentsUseCase {
  async execute({
    user_id,
    status
  }: ListUserDocumentsRequest): Promise<Document[]> {
    if (status === 3) {
      const documents = await prismaClient.document.findMany({
        where: { user_id: user_id },
        include: { user: true }
      });
      return documents;
    } else if (status === 2) {
      const documents = await prismaClient.document.findMany({
        where: { user_id: user_id, status: 2 },
        include: { user: true }
      });
      return documents;
    } else if (status === 1) {
      const documents = await prismaClient.document.findMany({
        where: { user_id: user_id, status: 1 },
        include: { user: true }
      });
      return documents;
    } else {
      const documents = await prismaClient.document.findMany({
        where: { user_id: user_id, status: 0 },
        include: { user: true }
      });
      return documents;
    }
  }
}
