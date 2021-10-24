import { NextFunction, Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const { enrolment, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();
    try {
      const authenticationInfo = await authenticateUserUseCase.execute({
        enrolment,
        password
      });

      return response.json(authenticationInfo);
    } catch (err) {
      next(err);
    }
  }
}
