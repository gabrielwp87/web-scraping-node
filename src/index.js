const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const axios = require('axios')
const { JSDOM } = require("jsdom")

const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())


// to generalize the directory with the static files
app.use(express.static(__dirname + "/public", {
  index: false, 
  immutable: true, 
  cacheControl: true,
  maxAge: "30d"
}));


// stop jsdom to print in console when it says it can parse CSS
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet"
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params)
  }
}


// get the url to the product
const getProductUrl = (product_keyword) => `https://www.amazon.com.br/s?k=${product_keyword}`

/*
This function will get a keyword from the frontend, and use it to go to make a search at amazon, getting
the products from the first page of the results. Selecting the title, rating of the product, number of reviews
and the image url from each of the products.
Return the data in json that will be used at the frontend.
*/
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

  // const $ = (selector) => dom.window.document.querySelector(selector)

  // function to get the info from each element passed as a parameter, returnin the data as json
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
    catch (error) {
      console.log(error)
    }
  })
  return offers
}


// Define route to scrape Amazon based on keyword
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword parameter is required' })
  }

  try {
    const scrapedData = await getProductInfo(keyword)
    res.json(scrapedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Amazon' })
  }
})


// Confirmation tha the server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});


// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
