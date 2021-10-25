import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { ensureAdmin } from './middleware/ensureAdmin';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { ensureStudent } from './middleware/ensureStudent';
import { ApproveDocumentController } from './useCases/approveDocumentUseCase/ApproveDocumentController';
import { AuthenticateUserController } from './useCases/authenticateUserUseCase/AuthenticateUserController';
import { CreateDocumentController } from './useCases/createDocumentUseCase/CreateDocumentController';
import { CreateUserController } from './useCases/createUserUseCase/CreateUserController';
import { DeleteDocumentController } from './useCases/deleteDocumentUseCase/DeleteDocumentController';
import { ListAllDocumentsController } from './useCases/listAllDocumentsUseCase/ListAllDocumentsController';
import { ListUserDocumentsController } from './useCases/listUserDocumentsUseCase/ListUserDocumentsController';
import { ListUsersController } from './useCases/listUsersUseCase/ListUsersController';
import { RejectDocumentController } from './useCases/rejectDocumentUseCase/RejectDocumentController';
import { UploadDocumentController } from './useCases/uploadDocumentUseCase/UploadDocumentController';
import { UserProfileController } from './useCases/userProfileUseCase/UserProfileController';
import { ViewDocumentController } from './useCases/viewDocumentUseCase/ViewDocumentController';

export const router = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const userProfileController = new UserProfileController();
const createDocumentController = new CreateDocumentController();
const uploadDocumentController = new UploadDocumentController();
const listAllDocumentsController = new ListAllDocumentsController();
const listUserDocumentsController = new ListUserDocumentsController();
const viewDocumentController = new ViewDocumentController();
const deleteDocumentController = new DeleteDocumentController();
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
router.get('/profile', ensureAuthenticated, userProfileController.handle);

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
router.get(
  '/documents',
  ensureAuthenticated,
  ensureAdmin,
  listAllDocumentsController.handle
);
router.get(
  '/documents/user',
  ensureAuthenticated,
  ensureStudent,
  listUserDocumentsController.handle
);
router.get(
  '/documents/:id',
  ensureAuthenticated,
  viewDocumentController.handle
);
router.delete(
  '/documents/:id',
  ensureAuthenticated,
  deleteDocumentController.handle
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
