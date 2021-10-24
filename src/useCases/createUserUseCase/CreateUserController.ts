import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { enrolment, password, name, role } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      const user = await createUserUseCase.execute({
        enrolment,
        password,
        name,
        role
      });

      return response.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}
