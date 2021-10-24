import { NextFunction, Request, Response } from 'express';
import { UserProfileUseCase } from './UserProfileUseCase';

export class UserProfileController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    const userProfileUseCase = new UserProfileUseCase();
    const user_id = request.user.id;

    try {
      const user = await userProfileUseCase.execute(user_id);
      return response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}
