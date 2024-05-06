const express = require('express')
const app = express()

const axios = require('axios')


const PORT = 3333


// const getProductUrl = (product_keyword) => `https://www.amazon.com.br/s?k=${product_keyword}`
const getProductUrl = (product_keyword) => `https://www.amazon.com.br/s?k=${product_keyword}`

async function  getProductInfo(product_keyword) {
  
  const productUrl = getProductUrl(product_keyword)
  const { data } = await axios.get(productUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      Host: 'www.amazon.com',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',
      'Upgrade-Insecure-Requests': 1,
    },
  });
  console.log(data)
}

getProductInfo("creatina")
console.log("hi")
