import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import authAdminAndUser from '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, OrderController.getAllOrder);
router.get('/:id', authAdminAndUser, OrderController.getOrderById);
router.post('/', authAdminAndUser,  OrderController.createOrder);
router.put('/:id', authAdminAndUser, OrderController.updateOrder);
router.delete('/:id', authAdminAndUser, OrderController.deleteOrder);

export default router;
