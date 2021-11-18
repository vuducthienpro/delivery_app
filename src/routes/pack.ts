import { Router } from 'express';
import PackController from './../controllers/PackController';
const router = Router();
router.post('/',PackController.createPack);
router.get('/',PackController.getListPack)

export default router;
