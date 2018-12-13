const request = require('request')
const cheerio = require('cheerio')
const phantom = require('phantom');
const puppeteer = require('puppeteer');

const getParsing = (req, res) => {
  if (!req.user) {
    return res.render("parsing", { flag: false })
  }
  return res.render("parsing", { flag: true })
}

const postParsing = (req, res) => {
//   // const url = req.body.url
//   // request(url, function (error, response, html) {    
//   //   if (!error && response.statusCode == 200) {
//   //     var $ = cheerio.load(html);
//   //     const content=[];
//   //     $('img').each(function(i,elem) {
//   //       let result = {};
//   //       // result.href = $(this).prev().attr('href')
//   //       result.src = $(this).attr('src');
//   //       result.alt = $(this).attr('alt');
//   //       content.push(result)
//   //     })
//   //     if (!req.user) {
//   //       return res.json( {  content })
//   //     }
//   //     return res.json( { content })      
//   //   }
//   // });  


 const scrape = async () => {
    const url = req.body.url
    const browser = await puppeteer.launch({ headless: false });
    // 
    const page = await browser.newPage();
    await page.goto(url, {timeout: 0} );
    await page.waitFor(3000);

    const preloadHref = await page.$$eval('div[class="view photo-list-photo-view awake"]', el => {
      let result = [];
      window.el = el;
      for (i = 0; i < el.length; i++) {
        let a = {}
        a.src = el[i].attributes.style.textContent;
        a.info = el[i]["innerText"];
        result.push(a)
      }
      return result;
    });
    browser.close();
    return preloadHref;
  };

  scrape()
    .then((content) => {
      return res.json( {content: content} )
    })
    .catch((err) => {
      res.json(err)
    })
  ;
  

}

module.exports = {
  getParsing,
  postParsing
}
