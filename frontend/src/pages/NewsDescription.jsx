import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewsDescription = () => {
  const { state } = useLocation(); // Access article data passed via `state`
  const navigate = useNavigate(); // For navigation in case of missing data
  const [news, setNews] = useState(null); // Initialize with null for fetched data
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    // If article data is not passed via state, fetch data from the API
    if (!state?.article) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(
            "https://newsapi.org/v2/top-headlines?apiKey=c0bb3f50e6eb46d3abd4c165e6d5edcf&country=us&pageSize=1"
          );
          const data = await response.json();

          if (response.ok && data.articles.length > 0) {
            setNews(data.articles[0]); // Set the first article
          } else {
            throw new Error("No article found.");
          }
        } catch (err) {
          setError(err.message);
        }
      };

      fetchArticle();
    } else {
      setNews(state.article); // Use the article passed via state
    }
  }, [state]);

  useEffect(() => {
    // Redirect or show error if no article data is available
    if (!news && !error) {
      console.error("No article data available.");
      // setTimeout(() => navigate("/"), 3000); // Redirect to homepage after 3 seconds
    }
  }, [news, error, navigate]);

  if (error) {
    return (
      <div className="text-center text-red-500 min-h-screen flex flex-col justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center text-gray-500 min-h-screen flex flex-col justify-center items-center">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100">
        {/* Container */}
        <div className="px-6 md:px-72 mx-auto bg-white shadow-lg rounded-md overflow-hidden">
          {/* News Title */}
          <div className="py-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {news.title || "Untitled Article"}
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium">
                {news.author || "Unknown Author"}
              </span>{" "}
              &bull; <span>{new Date(news.publishedAt).toDateString()}</span>
            </p>
          </div>

          {/* News Image */}
          {news.urlToImage && (
            <div className="mb-6">
              <img
                src={news.urlToImage}
                alt={news.title || "News Image"}
                className="w-full h-[600px] object-cover rounded-md shadow-md"
              />
            </div>
          )}

          {/* News Content */}
          <div className="p-6">
            {/* Description */}
            {news.description && (
              <p className="text-gray-700 leading-relaxed mb-6">
                {news.description}
              </p>
            )}

            {/* Full Content */}
            {news.url && (
              <div className="mt-6">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-800 underline"
                >
                  Read the full article on the source website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDescription;
