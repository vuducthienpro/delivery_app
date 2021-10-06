import { Router } from 'express';
import { CustomerController } from '../controllers/CutomerController';
const router = Router();

router.get('/', CustomerController.getAllCutomer);
router.get('/:id', CustomerController.getCustomerById);
router.post('/', CustomerController.createCutomer);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.destroyCustomer);

export default router;