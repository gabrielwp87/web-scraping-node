// get the info from what the user has typed as a product (keyword) and when the button was clicked
// everything starts after these events are done
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn')
    const keywordInput = document.getElementById('keyword')
    const resultsDiv = document.getElementById('results')

    // waits the button be clicked to get the keyword
    searchBtn.addEventListener('click', async () => {
      const keyword = keywordInput.value.trim()

      // if no keyword was typed an alert is sent
      if (keyword === '') {
        alert('Please enter a keyword')
        return
      }
      // try to send the keyword to the backend and recive the json with the data
      try {
        const response = await fetch(`/api/scrape?keyword=${keyword}`)
        const data = await response.json()
        displayResults(data)

      } catch (error) {
        console.error('Failed to fetch data: ', error)
        alert('Failed to fetch data. Please try again later.')
      }
    })

    // how will the data be displayed to the user
    function displayResults(data) {
      resultsDiv.innerHTML = ''
      data.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')

        const title = document.createElement('h2')
        title.textContent = product.product_title

        const rating = document.createElement('p')
        rating.textContent = `Rating: ${product.rating}`

        const reviews = document.createElement('p')
        reviews.textContent = `Number of Reviews: ${product.number_of_reviews}`

        const image = document.createElement('img')
        image.src = product.product_image_url
        image.alt = product.product_title

        productDiv.appendChild(title)
        productDiv.appendChild(rating)
        productDiv.appendChild(reviews)
        productDiv.appendChild(image)

        resultsDiv.appendChild(productDiv)
      })
    }
  })
