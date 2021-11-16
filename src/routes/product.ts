import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getCategoryByIdSchema, insertProductSchema, updateProductSchema, deleteCategoryByIdSchema } from '../validation/product';
import authAdmin from '../middleware/authAdmin';
import authAdminAndUser from '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, ProductController.getCategory);
router.get('/:id', getCategoryByIdSchema, validateRequestSchema, authAdminAndUser, ProductController.getProductById);
router.post('/', upload.array('image', 5), insertProductSchema, validateRequestSchema, authAdmin, ProductController.insertProduct);
router.put('/:id', upload.array('image', 5), updateProductSchema, validateRequestSchema, authAdmin, ProductController.updateProduct);
router.delete('/:id', deleteCategoryByIdSchema, validateRequestSchema, authAdmin, ProductController.DeleteProduct);
router.put('/update-status/:id', ProductController.updateStatusProduct);

export default router;
