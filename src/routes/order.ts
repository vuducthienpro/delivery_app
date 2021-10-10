import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import authAdminAndUser from '../middleware/authAdminAndUser';
import { validateRequestSchema } from '../middleware/validate';
import {
  getOrderByIdSchema,
  insertOrderSchema,
  updateOrderSchema,
  deleteOrderByIdSchema,
} from '../validation/order';

const router = Router();

router.get('/', authAdminAndUser, OrderController.getAllOrder);
router.get('/:id', getOrderByIdSchema, validateRequestSchema, authAdminAndUser, OrderController.getOrderById);
router.post('/', insertOrderSchema, validateRequestSchema, authAdminAndUser,  OrderController.createOrder);
router.put('/:id', updateOrderSchema, validateRequestSchema, authAdminAndUser, OrderController.updateOrder);
router.delete('/:id', deleteOrderByIdSchema, validateRequestSchema, authAdminAndUser, OrderController.deleteOrder);

export default router;
