import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import upload from '../middleware/upload';

const router = Router();

router.get('/getAll', CategoryController.getCategory);
router.post('/insert', upload.array('image', 5), CategoryController.insertCategory);
router.put('/update/:id', upload.array('image', 5), CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.DeleteCategory);

export default router;
