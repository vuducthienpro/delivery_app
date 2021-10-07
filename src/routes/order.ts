import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
const router = Router();

router.get('/', OrderController.getAllOrder);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export default router;