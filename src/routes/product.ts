import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import upload from '../middleware/upload';

const router = Router();

router.get('/getAll', ProductController.getCategory);
router.post('/insert', upload.array('image', 5), ProductController.insertProduct);
router.put('/update/:id', upload.array('image', 5), ProductController.updateProduct);
router.delete('/delete/:id', ProductController.DeleteProduct);

export default router;
