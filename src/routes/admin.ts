import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { validateRequestSchema } from '../middleware/validate';
import authAdmin from '../middleware/authAdmin';
import {
  getAdminByIdSchema,
  registerAdminSchema,
  loginAdminSchema,
  changePasswordSchema,
  deleteAdminByIdSchema,
} from '../validation/admin';

const router = Router();

router.get('/', authAdmin, AdminController.getAllAdmin);
router.get('/:id', getAdminByIdSchema, validateRequestSchema, authAdmin, AdminController.getAdminById);
router.post('/register', registerAdminSchema, validateRequestSchema, authAdmin, AdminController.registerAdmin);
router.post('/login', loginAdminSchema, validateRequestSchema, AdminController.login);
router.put('/change-password/:id', changePasswordSchema, validateRequestSchema, authAdmin, AdminController.changePassword);
router.delete('/:id', deleteAdminByIdSchema, validateRequestSchema, authAdmin, AdminController.deleteAdmin);
router.post('/logout', authAdmin, AdminController.logout);

export default router;
