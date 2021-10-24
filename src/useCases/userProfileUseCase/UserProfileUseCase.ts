import { prismaClient } from '../../prisma';

type User = {
  id: string;
  enrolment: string;
  name: string;
  role: string;
  createdAt: Date;
};

export class UserProfileUseCase {
  async execute(user_id: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await prismaClient.user.findFirst({
      where: { id: user_id }
    });

    return user;
  }
}
