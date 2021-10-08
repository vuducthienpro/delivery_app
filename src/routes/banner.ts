import { Router } from 'express';
import { BannerController } from '../controllers/BannerController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getBannerByIdSchema, deleteBannerByIdSchema, updateBannerSchema } from '../validate/banner';

const router = Router();

router.get('/', BannerController.getAllBanner);
router.get('/:id', getBannerByIdSchema, validateRequestSchema, BannerController.getBannerById);
router.post('/', upload.single('url'), BannerController.createBanner);
router.put('/:id', upload.single('url'), updateBannerSchema, validateRequestSchema, BannerController.updateBanner);
router.delete('/:id', deleteBannerByIdSchema, validateRequestSchema, BannerController.destroyBanner);

export default router;
