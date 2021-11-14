import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import authAdminAndUser from '../middleware/authAdminAndUser';
import { validateRequestSchema } from '../middleware/validate';
import { getOrderByIdSchema, insertOrderSchema, updateOrderSchema, deleteOrderByIdSchema } from '../validation/order';
import authUser from '../middleware/authUser';

const router = Router();

router.get('/', authAdminAndUser, OrderController.getAllOrder);
router.get('/history', authAdminAndUser, OrderController.historyOrder);
router.get('/:id', getOrderByIdSchema, validateRequestSchema, authAdminAndUser, OrderController.getOrderById);
router.post('/', insertOrderSchema, validateRequestSchema, authUser, OrderController.createOrder);
router.put('/:id', updateOrderSchema, validateRequestSchema, authAdminAndUser, OrderController.updateOrder);
router.delete('/:id', deleteOrderByIdSchema, validateRequestSchema, authAdminAndUser, OrderController.deleteOrder);
router.post('/purchase-order', authAdminAndUser, OrderController.purchaseOrder);
router.post('/ship-order', authAdminAndUser, OrderController.shipOrder);
router.get('/user/order-history', authAdminAndUser, OrderController.historyOrderUser);
router.put('/delivery-date-time/:id',authAdminAndUser,OrderController.updateDeliveryDateTime);

export default router;
