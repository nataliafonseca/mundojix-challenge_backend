import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
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
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          Error: err.message
        });
      }
      return response.status(500).json({
        Error: `Internal server error - ${err.message}`
      });
    }
  }
}
