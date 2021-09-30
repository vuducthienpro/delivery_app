import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/getAll', CategoryController.getCategory);
router.post('/insert', CategoryController.insertCategory);

export default router;
