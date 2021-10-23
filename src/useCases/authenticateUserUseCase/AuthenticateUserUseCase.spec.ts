import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUserUseCase/CreateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Create User UseCase', () => {
  beforeEach(async () => {
    authenticateUserUseCase = new AuthenticateUserUseCase();
    createUserUseCase = new CreateUserUseCase();
    await prismaClient.user.deleteMany({});
  });

  it('should be able to authenticate user', async () => {
    await createUserUseCase.execute({
      enrolment: '2525252525',
      password: '123456',
      name: 'John Doe',
      role: 'student'
    });

    const response = await authenticateUserUseCase.execute({
      enrolment: '2525252525',
      password: '123456'
    });

    expect(response).toHaveProperty('authToken');
    expect(response.user.enrolment).toBe('2525252525');
  });

  it('should not be able to authenticate a non-existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        enrolment: '2525252525',
        password: '123456'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
