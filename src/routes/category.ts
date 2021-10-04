import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getCategoryByIdSchema, insertCategorySchema } from '../validate/category';

const router = Router();

router.get('/', CategoryController.getCategory);
router.get('/:id', getCategoryByIdSchema, validateRequestSchema, CategoryController.getCategoryById);
router.post('/', insertCategorySchema, validateRequestSchema, upload.array('image', 5), CategoryController.insertCategory);
router.put('/:id', upload.array('image', 5), CategoryController.updateCategory);
router.delete('/:id', CategoryController.DeleteCategory);

export default router;
