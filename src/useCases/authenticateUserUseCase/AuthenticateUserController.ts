import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { enrolment, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();
    try {
      const authenticationInfo = await authenticateUserUseCase.execute({
        enrolment,
        password
      });

      return response.json(authenticationInfo);
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
