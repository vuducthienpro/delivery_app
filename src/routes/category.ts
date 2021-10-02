import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', CategoryController.getCategory);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', upload.array('image', 5), CategoryController.insertCategory);
router.put('/:id', upload.array('image', 5), CategoryController.updateCategory);
router.delete('/:id', CategoryController.DeleteCategory);

export default router;
