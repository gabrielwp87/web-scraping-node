const express = require('express')
const app = express()

const axios = require('axios')
const { JSDOM } = require("jsdom")

const PORT = 3333


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
  // console.log(data)
  // s-result-item
  const dom = new JSDOM(data)

  const $ = (selector) => dom.window.document.querySelector(selector)

  console.log($('.s-product-image-container .s-image').getAttribute('src'))


  // const getInfo = (element) => {
  //   const product_title = $('.s-title-instructions-style .a-text-normal').textContent.trim()
//   const rating = $('.a-spacing-top-micro .a-icon-alt').textContent.trim()
//   const number_of_reviews = $('.a-spacing-top-micro .a-size-base').textContent.trim()
//   const product_image_url = element.querySelector('.a-seection .s-image').getAttribute('src')
//   return {
//     product_title,
//     rating,
//     number_of_reviews,
//     product_image_url,
//   }
// }<span class="a-size-base s-underline-text">2,994</span>

}






getProductInfo("creatina")
console.log("hi")
