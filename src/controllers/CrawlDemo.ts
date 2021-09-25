import { captureScreen, crawlListPage } from '../services/CrawlService';

export default class CrawlDemo {
  public static captureScreen(req, res, next): any {
    captureScreen().then();

    return res.json({
      title: 'capture screen',
    });
  }

  public static crawlListPage(req, res, next): any {
    crawlListPage().then();
    return res.json({
      title: 'crawl list page',
    });
  }
}
