# Amazon Scraper

This project is a simple web scraper for Amazon search results. It allows users to enter a search keyword, initiates the scraping process on the backend, and displays the scraped results on the frontend.

## Features

- Backend API built with Node.js, Express, Axios, and JSDOM.
- Frontend webpage developed with HTML, CSS, and Vanilla JavaScript.
- Scrapes Amazon search results for product title, rating, number of reviews, and product image URL.
- User-friendly interface with input field and button for searching.

## Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:gabrielwp87/web-scraping-node.git
    cd web-scraping-node
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the backend server:**

    ```bash
    npm start
    or
    node src/index.js
    ```

4. **Open the frontend webpage:**

    Open `http://localhost:3000/` in your web browser.

## Usage

1. Enter a search keyword in the input field.
2. Click the "Search" button.
3. Wait for the scraping process to complete.
4. View the scraped results displayed on the page.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


## Project
Objective: Create a simple script to scrape Amazon product listings from the first page of search results for a given keyword.

Project Requirements:

    1-Backend/API (Node.js):
        Set up a Node.js project with the necessary dependencies (express, axios and JSDOM).
        Write a script using axios to fetch the contents of the Amazon search results page for a given keyword.
        Use JSDOM to parse the HTML content and extract the following details for each product listing on the first page:
           - Product Title
           - Rating (stars out of five)
           - Number of reviews
           - Product image URL
        Create an endpoint /api/scrape where a GET request with a query parameter ?keyword=yourKeyword initiates the scraping process and returns the extracted data in JSON format.

    2-Frontend (HTML, CSS, Vanilla JavaScript):
        Develop a simple webpage with:
           - An input field to enter the search keyword.
           - A button to initiate the scraping process.
        Style the webpage to be user-friendly and presentable.
        Implement JavaScript to make an AJAX call to the backend endpoint when the button is clicked, and display the results formatted cleanly on the page.
