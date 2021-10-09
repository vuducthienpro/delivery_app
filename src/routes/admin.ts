import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
const router = Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getAdminById);
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.login);
router.put('/change-password/:id', AdminController.changePassword);
router.delete('/:id', AdminController.deleteAdmin);
router.post('/logout', AdminController.logout);

export default router;
