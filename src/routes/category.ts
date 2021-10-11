import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getCategoryByIdSchema, insertCategorySchema, updateCategorySchema, deleteCategoryByIdSchema } from '../validation/category';
import authAdmin from '../middleware/authAdmin';
import authAdminAndUser from  '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, CategoryController.getCategory);
router.get('/:id', getCategoryByIdSchema, validateRequestSchema, authAdminAndUser, CategoryController.getCategoryById);
router.post('/', upload.array('image', 5), insertCategorySchema, validateRequestSchema, authAdmin, CategoryController.insertCategory);
router.put('/:id', upload.array('image', 5), updateCategorySchema, validateRequestSchema, authAdmin, CategoryController.updateCategory);
router.delete('/:id', deleteCategoryByIdSchema, validateRequestSchema, authAdmin, CategoryController.DeleteCategory);

export default router;
