const express = require('express')
const app = express()

const axios = require('axios')
const { JSDOM }  = require("jsdom")

const PORT = 3333


const getProductUrl = (produtct_id) => `https://www.amazon.com.br/?tag=admarketbr-20&ref=pd_sl_ee1f051d03fe7ebc7cf11aab597ceb571053edd1ba0cd53f0fc76ed3&mfadid=adm`

async function getProductTitle(produtct_id) {
  const productUrl = getProductUrl(produtct_id)
  const { htmlData } = await axios.getAdapter(productUrl, {
    headres: {
      Accept: '*/*',
      Host: 'www.amazon.com',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36'
    }
  })

  const dom = new JSDOM(htmlData)
  console.log(dom.window.document.querySelector("p").textContent)
  console.log(htmlData)
}

// function getProductRating()

// function getProductNumberReviews()

// function getProductImageUrl()








// Responde com 'hello world' quando uma requisição é feita à homepage
// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

// app.listen(PORT, () => {
//     console.log(`App online na porta ${PORT}`)
// })


