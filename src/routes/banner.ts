import { Router } from 'express';
import { BannerController } from '../controllers/BannerController';

const router = Router();

router.get('/', BannerController.getAllBanner);
router.get('/:id', BannerController.getBannerById);

export default router;