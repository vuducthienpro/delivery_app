import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', ProductController.getCategory);
router.get('/:id', ProductController.getProductById);
router.post('/', upload.array('image', 5), ProductController.insertProduct);
router.put('/:id', upload.array('image', 5), ProductController.updateProduct);
router.delete('/:id', ProductController.DeleteProduct);

export default router;
