const puppeteer = require('puppeteer');

const postParsing = (req, res) => {

  const scrape = async () => {
    const url = req.body.url
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });
    await page.waitFor(3000);

    const preloadHref = await page.$$eval('img', el => {
     return el.href
    });
    browser.close();
    return preloadHref;
  };

  scrape()
    .then((content) => {
      return res.json({ content: content })
    })
    .catch((err) => {
      res.json(err)
    })
}
module.exports = {
  postParsing
}