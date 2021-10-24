import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { ensureAdmin } from './middleware/ensureAdmin';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { ensureStudent } from './middleware/ensureStudent';
import { AuthenticateUserController } from './useCases/authenticateUserUseCase/AuthenticateUserController';
import { CreateDocumentController } from './useCases/createDocumentUseCase/CreateDocumentController';
import { CreateUserController } from './useCases/createUserUseCase/CreateUserController';
import { ListUsersController } from './useCases/listUsersUseCase/ListUsersController';
import { UploadDocumentController } from './useCases/uploadDocumentUseCase/UploadDocumentController';

export const router = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const createDocumentController = new CreateDocumentController();
const uploadDocumentController = new UploadDocumentController();

router.get('/', (request, response) => {
  return response.json({ hello: 'MagisterDoc' });
});

router.post(
  '/register',
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
router.post('/login', authenticateUserController.handle);

router.get(
  '/users',
  ensureAuthenticated,
  ensureAdmin,
  listUserController.handle
);
router.post(
  '/documents',
  ensureAuthenticated,
  ensureStudent,
  multer(multerConfig).single('file'),
  createDocumentController.handle
);
router.patch(
  '/documents/upload',
  ensureAuthenticated,
  ensureStudent,
  multer(multerConfig).single('file'),
  uploadDocumentController.handle
);
