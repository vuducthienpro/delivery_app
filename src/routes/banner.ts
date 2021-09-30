import { Router } from 'express';
import { BannerController } from '../controllers/BannerController';
import upload from '../middleware/upload';

const router = Router();

router.get('/', BannerController.getAllBanner);
router.get('/:id', BannerController.getBannerById);
router.post('/', upload.single('url'), BannerController.createBanner);

export default router;