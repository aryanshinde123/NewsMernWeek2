import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchArticles = async () => {
  try {
    const response = await api.get('/top-headlines', {
      params: {
        apiKey: process.env.REACT_APP_API_KEY,  // Your NewsAPI key from the .env file
        country: 'us',                         // You can change this to any country code (like 'us', 'gb', etc.)
        pageSize: 5,                           // Limit to 5 articles per request (or adjust as needed)
      },
    });
    if (response.status === 200) {
      return response.data.articles;  // Return the fetched articles
    } else {
      throw new Error('Failed to fetch articles');
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
