const express = require('express')
const app = express()
const PORT = 3333

const axios = require('axios')


const getProductUrl = (produtct_id) => `https://www.amazon.com.br/?tag=admarketbr-20&ref=pd_sl_ee1f051d03fe7ebc7cf11aab597ceb571053edd1ba0cd53f0fc76ed3&mfadid=adm`

async function getProductTitle(produtct_id) {
  const productUrl = getProductUrl(produtct_id)
  const { data } = await axios.getAdapter(productUrl)
  console.log(data)
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


