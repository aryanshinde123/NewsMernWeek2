import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const LeftColumn = ({ articles }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Remove duplicate articles based on title and filter articles without images
  const uniqueArticles = articles
    .filter((article, index, self) => 
      self.findIndex((a) => a.title === article.title) === index // Remove duplicates based on title
    )
    .filter((article) => article.urlToImage); // Exclude articles without images

  const formatTitleToSlug = (title) => title.replace(/\s+/g, '-').toLowerCase();

  const handleReadMoreClick = (article) => {
    if (!user) {
      setShowLoginDialog(true);
    } else {
      navigate(`/news/${formatTitleToSlug(article.title)}`, { state: { article } });
    }
  };

  const truncateDescription = (description) => {
    return description
      ? description.length > 150
        ? `${description.substring(0, 150)}...`
        : description
      : 'No description available.';
  };

  return (
    <div className="space-y-6">
      {uniqueArticles.map((article, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 border-b border-gray-300">
          <div className="flex-1">
            <button
              onClick={() => handleReadMoreClick(article)}
              className="text-sm font-semibold text-gray-900 hover:text-sky-600 w-full text-left"
            >
              {article.title || 'Untitled Article'}
            </button>
            <p className="text-sm text-gray-700 mt-2">
              {truncateDescription(article.description)}
            </p>
            <button
              onClick={() => handleReadMoreClick(article)}
              className="text-sky-600 hover:text-sky-800 mt-4 inline-block"
            >
              Read More
            </button>
          </div>
          <div className="flex-1 h-auto">
            <button
              onClick={() => handleReadMoreClick(article)}
              className="w-full h-full"
            >
              <img
                src={article.urlToImage || '/placeholder-image.jpg'}
                alt={article.title || 'Untitled'}
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </button>
          </div>
        </div>
      ))}

      {showLoginDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-gray-800">Login Required</h2>
            <p className="text-gray-700 mt-4">You need to be logged in to read the article.</p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowLoginDialog(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              <Link
                to="/login"
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftColumn;
