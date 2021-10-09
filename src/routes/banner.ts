import { Router } from 'express';
import { BannerController } from '../controllers/BannerController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import { getBannerByIdSchema, deleteBannerByIdSchema, updateBannerSchema } from '../validation/banner';
import authAdmin from '../middleware/authAdmin';
import authAdminAndUser from '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, BannerController.getAllBanner);
router.get('/:id', getBannerByIdSchema, validateRequestSchema, authAdminAndUser, BannerController.getBannerById);
router.post('/', upload.single('url'), authAdmin, BannerController.createBanner);
router.put('/:id', upload.single('url'), updateBannerSchema, validateRequestSchema, authAdmin, BannerController.updateBanner);
router.delete('/:id', deleteBannerByIdSchema, validateRequestSchema, authAdmin, BannerController.destroyBanner);

export default router;
