import { Router } from 'express';
import { CreateUserController } from './useCases/createUserUseCase/CreateUserController';

export const router = Router();

const createUserController = new CreateUserController();

router.get('/', (request, response) => {
  return response.json({ hello: 'MagisterDoc' });
});

router.post('/register', createUserController.handle);
