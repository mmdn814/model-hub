import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const content = await page.content();
  console.log(content.substring(0, 500));
  console.log('... length: ', content.length);
  await browser.close();
})();
