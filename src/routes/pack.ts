import { Router } from 'express';
import PackController from './../controllers/PackController';
const router = Router();
router.post('/',PackController.createPack);
router.get('/',PackController.getListPack);
router.get('/:id',PackController.getDetialPack);

export default router;
