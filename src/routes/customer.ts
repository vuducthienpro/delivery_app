import { Router } from 'express';
import { CustomerController } from '../controllers/CutomerController';
import { validateRequestSchema } from '../middleware/validate';
import {
  getCustomerByIdSchema,
  insertCustomerSchema,
  updateCustomerSchema,
  deleteCustomerByIdSchema,
} from '../validate/customer';

const router = Router();

router.get('/', CustomerController.getAllCutomer);
router.get(
  '/:id',
  getCustomerByIdSchema,
  validateRequestSchema,
  CustomerController.getCustomerById,
);
router.post('/', insertCustomerSchema, validateRequestSchema, CustomerController.createCutomer);
router.put('/:id', updateCustomerSchema, validateRequestSchema, CustomerController.updateCustomer);
router.delete(
  '/:id',
  deleteCustomerByIdSchema,
  validateRequestSchema,
  CustomerController.destroyCustomer,
);

export default router;
