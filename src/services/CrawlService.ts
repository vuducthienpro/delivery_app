import puppeteer from 'puppeteer';
import randomUseragent from 'random-useragent';
import fs from 'fs';
import image from 'image-downloader';

import winston from '../config/winston';

export async function captureScreen() {
  try {
    // open browser
    const browser = await puppeteer.launch({headless: false});
    // Mở new tab
    const page = await browser.newPage();
    await page.setViewport({width: 720, height: 720});
    // go to page
    await page.goto('https://www.homes.co.jp/chintai/b-1446290000001/', {timeout: 90000});
    // capture screen and save
    await page.screenshot({path: 'house_detail.png'});

    // close browser
    await browser.close();
  } catch (e) {
    winston.error(e);
  }
}

export async function crawlListPage() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
  });

  try {
    const page = await browser.newPage();
    const agent = randomUseragent.getRandom();
    winston.info(agent);
    await page.setUserAgent(agent);
    await page.setViewport({width: 1280, height: 720});
    await page.goto('https://www.cbre-propertysearch.jp/industrial/tokyo/?q=東京都&page=1', {timeout: 90000});
    const totalPage = await page.evaluate(() => {
      return Number(document.querySelector('#contents > div > div.propertyList > div > div.tools.bottom > div > ul > li:nth-child(6) > a').innerHTML);
    });

    for (let i = 1; i <= totalPage; i++) {
      await getUrlListPage(page, `https://www.cbre-propertysearch.jp/industrial/tokyo/?q=東京都&page=${i}`);
    }

    await browser.close();
  } catch (e) {
    winston.error(e);

    await browser.close();
  }
}

async function getUrlListPage(page, url) {
  winston.info(`Start crawl page ${url}`);
  await page.goto(url, {timeout: 90000});

  const articles = await page.evaluate(() => {
    const titles = document.querySelectorAll('div.itemGroup div.item h2.name a');
    const arTitle = [];
    titles.forEach(item => {
      arTitle.push({
        href: item.getAttribute('href').trim(),
      });
    });

    return arTitle;
  });

  // list promise
  const promises = [];
  for (let i = 0; i < articles.length; i++) {
    promises.push(await getTitle(articles[i].href, page, i));
  }

  return await Promise.all(promises);
}

async function getTitle(link, page, key) {
  await page.goto(`https://www.cbre-propertysearch.jp/${link}`, {
    // Set timeout cho page
    timeout: 3000000,
  });
  await page.waitForSelector('#contents > div > div.columnSection.clearfix > div > div.bodySection');
  await page.waitForSelector('#contents > div > div.columnSection.clearfix > div > div.imgSection');
  await page.waitForTimeout(5000);

  const dataPage = await page.evaluate(() => {
    // @ts-ignore
    const titlePage = document.querySelector('#contents > div > div.columnSection.clearfix > div > div.bodySection > table > tbody > tr:nth-child(1) > td').innerText;
    // @ts-ignore
    const location = document.querySelector('#contents > div > div.columnSection.clearfix > div > div.bodySection > table > tbody > tr:nth-child(2) > td').innerText;

    const imageTag = document.querySelector('#contents > div > div.columnSection.clearfix > div > div.imgSection > div > div.thumb.js_thumb > div.inner > div > ul:nth-child(1) > li:nth-child(1) > img');
    const imageUrl = imageTag ? imageTag.getAttribute('src') : '';

    const iconTag = document.querySelector('#contents > div > div.columnSection.clearfix > div > div.bodySection > ul.icons > li:nth-child(1) > span > img');
    const iconUrl = iconTag ? iconTag.getAttribute('src') : '';

    return {titlePage, location, imageUrl, iconUrl};
  });

  await saveImage(dataPage.imageUrl);
  await saveImage(`https://www.cbre-propertysearch.jp/${dataPage.iconUrl}`);

  winston.info(`Data page ${link} is ${JSON.stringify(dataPage)}`);
  await page.waitForTimeout(Math.random() * 1000);

  return page;
}

async function saveImage(link) {
  if (!link) {
    winston.error(`${link} is invalid`);
    return;
  }

  try {
    winston.info(`Save image with ${link}`);
    const fileNameAr = link.split('/');
    const fileName = fileNameAr[fileNameAr.length - 1];
    const folderImages = 'logs/images';

    if (!fs.existsSync(folderImages)) {
      fs.mkdirSync(folderImages);
    }

    image.image({
      url: link,
      dest: `${folderImages}/${fileName}`,
    }).catch((er) => {
      return winston.info(er);
    });
  } catch (e) {
    winston.error(`${link} is invalid`);
  }
}
