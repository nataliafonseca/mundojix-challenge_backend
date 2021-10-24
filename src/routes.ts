import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { ensureAdmin } from './middleware/ensureAdmin';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { ensureStudent } from './middleware/ensureStudent';
import { RejectDocumentController } from './useCases/rejectDocumentUseCase/RejectDocumentController';
import { AuthenticateUserController } from './useCases/authenticateUserUseCase/AuthenticateUserController';
import { CreateDocumentController } from './useCases/createDocumentUseCase/CreateDocumentController';
import { CreateUserController } from './useCases/createUserUseCase/CreateUserController';
import { ListUsersController } from './useCases/listUsersUseCase/ListUsersController';
import { UploadDocumentController } from './useCases/uploadDocumentUseCase/UploadDocumentController';
import { ApproveDocumentController } from './useCases/approveDocumentUseCase/ApproveDocumentController';

export const router = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const createDocumentController = new CreateDocumentController();
const uploadDocumentController = new UploadDocumentController();
const approveDocumentController = new ApproveDocumentController();
const rejectDocumentController = new RejectDocumentController();

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
router.patch(
  '/documents/approve',
  ensureAuthenticated,
  ensureAdmin,
  approveDocumentController.handle
);
router.patch(
  '/documents/reject',
  ensureAuthenticated,
  ensureAdmin,
  rejectDocumentController.handle
);
