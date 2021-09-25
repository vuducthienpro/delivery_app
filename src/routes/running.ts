import { Router } from 'express';

import RunningController from '../controllers/RunningDemo';

const router = Router();

router.get('/validation', RunningController.runValidation);

export default router;
