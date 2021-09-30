import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/getAll', CategoryController.getCategory);
router.post('/insert', CategoryController.insertCategory);
router.put('/update/:id', CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.DeleteCategory);

export default router;
