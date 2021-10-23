import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;

describe('Create User UseCase', () => {
  beforeEach(async () => {
    createUserUseCase = new CreateUserUseCase();
    await prismaClient.user.deleteMany({});
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      enrolment: '2525252525',
      password: '123456',
      name: 'John Doe',
      role: 'student'
    });

    expect(user).toBeTruthy();
    expect(user.enrolment).toBe('2525252525');
  });

  it('should not be able to create a new user with the same enrolment number', async () => {
    const user1 = await createUserUseCase.execute({
      enrolment: '2525252525',
      password: '123456',
      name: 'John Doe',
      role: 'student'
    });

    expect(user1).toBeTruthy();
    expect(user1.enrolment).toBe('2525252525');

    expect(async () => {
      await createUserUseCase.execute({
        enrolment: '2525252525',
        password: '123456',
        name: 'John Doe',
        role: 'student'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
