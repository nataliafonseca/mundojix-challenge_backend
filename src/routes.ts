import { Router } from 'express';
import { AuthenticateUserController } from './useCases/authenticateUserUseCase/AuthenticateUserController';
import { CreateUserController } from './useCases/createUserUseCase/CreateUserController';
import { ListUsersController } from './useCases/listUsersUseCase/ListUsersController';

export const router = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();

router.get('/', (request, response) => {
  return response.json({ hello: 'MagisterDoc' });
});

router.post('/register', createUserController.handle);
router.post('/login', authenticateUserController.handle);

router.get('/users', listUserController.handle);
