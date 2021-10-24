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

export class ApproveDocumentUseCase {
  async execute(document_id: string): Promise<Document> {
    const document = await prismaClient.document.update({
      where: { id: document_id },
      data: { status: 1 }
    });

    return document;
  }
}
