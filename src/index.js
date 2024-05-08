const fs = require('node:fs')
const express = require('express')
const app = express()

const axios = require('axios')
const { JSDOM } = require("jsdom")

const PORT = 3000

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};


const getProductUrl = (product_keyword) => `https://www.amazon.com.br/s?k=${product_keyword}`

async function  getProductInfo(product_keyword) {
  
  const productUrl = getProductUrl(product_keyword)
  const { data } = await axios.get(productUrl, { // headers to simulate a browser, american amazon data
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      Host: 'www.amazon.com',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',
      'Upgrade-Insecure-Requests': 1,
      Pragma: 'no-cache',
    },
  });

  const dom = new JSDOM(data)

  const $ = (selector) => dom.window.document.querySelector(selector)

  // function to get in json 
  const getInfo = (element) => {
    const product_title = element.querySelector('.s-title-instructions-style .a-text-normal').textContent.trim()
    const rating = element.querySelector('.a-spacing-top-micro .a-icon-alt').textContent.trim()
    const number_of_reviews = element.querySelector('.a-spacing-top-micro .a-size-base').textContent.trim()
    const product_image_url = element.querySelector('.s-product-image-container .s-image').getAttribute('src')
    return {
      product_title,
      rating,
      number_of_reviews,
      product_image_url,
    }
}

  // .s-card-container -> is the class that has 1 product and will be used to get all products
  // and return a Node List with all products
  // after that it will be used to in each one to get the info requested
  const offerElements = dom.window.document.querySelectorAll('.s-card-container')
  const offers = [];
  offerElements.forEach((element) => {
    try {
    offers.push(getInfo(element));
    }
    catch {}
    // console.log(offers)
  });
  const jsonData = JSON.stringify(offers);
  return offers
}




// Define route to scrape Amazon based on keyword
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword parameter is required' });
  }

  try {
    const scrapedData = await getProductInfo(keyword);
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Amazon' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







// getProductInfo("creatina")
// console.log("hi")
