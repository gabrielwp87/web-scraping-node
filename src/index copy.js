// const express = require('express')
// const app = express()

const axios = require('axios')
const { JSDOM }  = require("jsdom")

// const PORT = 3333


const getProductUrl = (produtct_keyword) => `https://www.amazon.com.br/s?k=${produtct_keyword}`

async function  getProductInfo(product_id) {
  const productUrl = getProductUrl(produtct_keyword.trim().repalce(' ', '+'))
  const { htmlData } = await axios.getAdapter(productUrl, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      Host: 'www.amazon.com',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',
      'Upgrade-Insecure-Requests': 1,
    },
  })

  const dom = new JSDOM(htmlData)


  const $ = (selector) => dom.window.document.querySelector(selector)


  const getInfo = (element) => {
    const product_title = element.querySelector('.s-title-instructions-style .a-text-normal').textContent.trim()
    const rating = element.querySelector('.a-spacing-top-micro .a-icon-alt').textContent.trim()
    const number_of_reviews = element.querySelector('.a-spacing-top-micro .s-underline-text').textContent.trim()
    const product_image_url = element.querySelector('.a-seection .s-image').getAttribute('src')
    return {
      product_title,
      rating,
      number_of_reviews,
      product_image_url,
    }
  }

  const productElements = productsList.querySelectorAll('.s-main-slot')
  const offers = []
  productElements.forEach((productElement) => {
    offers.push(getInfo(productElement));
  })
  const result = {
    'product_title': product_title,
    'rating': rating,
    'number_of_reviews': number_of_reviews,
    'product_image_url': product_image_url,
  }
  console.log(result)
}
getProductInfo('creatina')
