import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import authAdminAndUser from '../middleware/authAdminAndUser';
import { validateRequestSchema } from '../middleware/validate';
import { getOrderByIdSchema, insertOrderSchema, updateOrderSchema, deleteOrderByIdSchema } from '../validation/order';
import authUser from '../middleware/authUser';

const router = Router();

router.get('/', authAdminAndUser, OrderController.getAllOrder);
router.get('/history', authAdminAndUser, OrderController.historyOrder);
router.get('/:id', getOrderByIdSchema, OrderController.getOrderById);
router.post('/', insertOrderSchema, validateRequestSchema, authUser, OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', deleteOrderByIdSchema, validateRequestSchema, authAdminAndUser, OrderController.deleteOrder);
router.post('/purchase-order', authAdminAndUser, OrderController.purchaseOrder);
router.post('/ship-order', authAdminAndUser, OrderController.shipOrder);
router.get('/user/order-history', authAdminAndUser, OrderController.historyOrderUser);
router.put('/delivery-date-time/:id', authAdminAndUser, OrderController.updateDeliveryDateTime);
router.put('/update-status/:id', authAdminAndUser, OrderController.updateStatusOrder);
router.put('/agree-delivery/:id',authAdminAndUser, OrderController.agreeDelivery);
router.put('/notification-make-parchase-bill/:id', OrderController.sendNotificationMakePurchaseBill);
router.put('/notification-finish-weight-measuremen/:id', OrderController.sendNotificationFinishWeightMeasument);
router.put('/notification-arrived-in-hanoi/:id', OrderController.sendNotificationArrivedHN);
router.get('/history-notfication/:id',OrderController.historyNotificationOrder);
router.put('/delete-product/:id',OrderController.deleteProductOrder);
router.post('/add-product/:id',OrderController.addProductToOrder);
export default router;
