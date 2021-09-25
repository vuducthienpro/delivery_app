import { Router } from 'express';

import CrawlController from '../controllers/CrawlDemo';

const router = Router();

router.get('/capture-screen', CrawlController.captureScreen);
router.get('/crawl-list-page', CrawlController.crawlListPage);

export default router;
