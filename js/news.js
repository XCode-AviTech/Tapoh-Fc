// Define the API URL and the API key
const apiUrl = 'https://newsdata.io/api/1/news?apikey=pub_747179294b0f59d6dca3379e596581bce54de&q=ugandan%20sports&country=ug&language=en&category=sports';  // News API endpoint

// Fetch the news using the provided API
fetch(apiUrl)
    .then(response => response.json())  // Parse the response to JSON
    .then(data => {
        // Get the container where you want to display the news
        const newsContainer = document.getElementById('news-container');
        
        // Check if the API returned any articles
        if (data.results && data.results.length > 0) {
            // Loop through each article and display it
            data.results.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');  // Add a CSS class to style it
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.link}" target="_blank">Read more</a>
                `;
                // Append the article element to the news container
                newsContainer.appendChild(articleElement);
            });
        } else {
            // Display a message if no articles are returned
            newsContainer.innerHTML = '<p>No news found.</p>';
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching news:', error);
        document.getElementById('news-container').innerHTML = '<p>Failed to load news.</p>';
    });
