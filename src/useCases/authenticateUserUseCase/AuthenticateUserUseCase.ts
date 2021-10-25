import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
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

type AuthenticateUserRequest = Pick<User, 'enrolment' | 'password'>;

type AuthenticateUserResponse = {
  authToken: string;
  user: Omit<User, 'password' | 'createdAt'>;
};

export class AuthenticateUserUseCase {
  async execute({
    enrolment,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        enrolment: enrolment
      }
    });

    if (!user) {
      throw new AppError('Matrícula ou senha incorreta');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Matrícula ou senha incorreta');
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      enrolment: user.enrolment,
      role: user.role
    };

    const authToken = sign(
      {
        user: userInfo
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return {
      authToken,
      user: userInfo
    };
  }
}
