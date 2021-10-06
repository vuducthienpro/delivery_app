import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import {
    getCategoryByIdSchema,
    insertProductSchema,
    updateProductSchema,
    deleteCategoryByIdSchema,
} from '../validate/product';

const router = Router();

router.get('/', ProductController.getCategory);
router.get('/:id', getCategoryByIdSchema, validateRequestSchema,  ProductController.getProductById);
router.post('/', upload.array('image', 5), insertProductSchema, validateRequestSchema, ProductController.insertProduct);
router.put('/:id', upload.array('image', 5), updateProductSchema, validateRequestSchema, ProductController.updateProduct);
router.delete('/:id', deleteCategoryByIdSchema, validateRequestSchema,  ProductController.DeleteProduct);

export default router;
