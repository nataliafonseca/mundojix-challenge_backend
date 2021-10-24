import { prismaClient } from '../../prisma';

type User = {
  id: string;
  enrolment: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
};

export class ListUsersUseCase {
  async execute(): Promise<User[]> {
    const users = await prismaClient.user.findMany({});

    return users;
  }
}
