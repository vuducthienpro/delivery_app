import { Router } from 'express';
import { CustomerController } from '../controllers/CutomerController';
import { validateRequestSchema } from '../middleware/validate';
import {
  getCustomerByIdSchema,
  insertCustomerSchema,
  updateCustomerSchema,
  deleteCustomerByIdSchema,
} from '../validation/customer';
import authAdminAndUser from '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, CustomerController.getAllCutomer);
router.get(
  '/:id',
  getCustomerByIdSchema,
  validateRequestSchema,
  authAdminAndUser,
  CustomerController.getCustomerById,
);
router.post('/', insertCustomerSchema, validateRequestSchema, authAdminAndUser, CustomerController.createCutomer);
router.put('/:id', updateCustomerSchema, validateRequestSchema, authAdminAndUser, CustomerController.updateCustomer);
router.delete(
  '/:id',
  deleteCustomerByIdSchema,
  validateRequestSchema,
  authAdminAndUser,
  CustomerController.destroyCustomer,
);

export default router;
