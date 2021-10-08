import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getCategoryByIdSchema, insertCategorySchema, updateCategorySchema, deleteCategoryByIdSchema } from '../validate/category';

const router = Router();

router.get('/', CategoryController.getCategory);
router.get('/:id', getCategoryByIdSchema, validateRequestSchema, CategoryController.getCategoryById);
router.post('/', upload.array('image', 5), insertCategorySchema, validateRequestSchema, CategoryController.insertCategory);
router.put('/:id', upload.array('image', 5), updateCategorySchema, validateRequestSchema, CategoryController.updateCategory);
router.delete('/:id', deleteCategoryByIdSchema, validateRequestSchema, CategoryController.DeleteCategory);

export default router;
