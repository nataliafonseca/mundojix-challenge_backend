import { hash } from 'bcryptjs';
import { AppError } from '../../errors/AppError';
import { prismaClient } from '../../prisma';

type User = {
  id: string;
  enrolment: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
};

type CreateUserRequest = Omit<User, 'id' | 'createdAt'>;

export class CreateUserUseCase {
  async execute({
    enrolment,
    password,
    name,
    role
  }: CreateUserRequest): Promise<User> {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        enrolment: enrolment
      }
    });

    if (userAlreadyExists) {
      throw new AppError('Usuário já cadastrado no sistema');
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        enrolment,
        password: passwordHash,
        name,
        role
      }
    });

    return user;
  }
}
