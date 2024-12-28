import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSearchResults }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?apiKey=dda527c7b3a0481c8af865b033daecf1&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();

        if (response.ok) {
          setSearchResults(data.articles); // Pass search results to HomePage
        } else {
          throw new Error(data.message || "Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category); // Set search query to the selected category
    setSearchResults(null); // Reset search results when category is clicked
    handleSearch(); // Perform the search operation using the selected category
  };

  return (
    <nav className="shadow-lg">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <a href="#" className="underline hover:text-gray-800">
            Today's Paper
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="hover:text-gray-800"
            onClick={() => handleCategoryClick("India")}
          >
            India
          </button>
          <button
            className="hover:text-gray-800"
            onClick={() => handleCategoryClick("International")}
          >
            International
          </button>
          <button
            className="hover:text-gray-800"
            onClick={() => handleCategoryClick("Hindi")}
          >
            Hindi
          </button>
          <button
            className="hover:text-gray-800"
            onClick={() => handleCategoryClick("Marathi")}
          >
            Marathi
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-4xl font-serif font-bold text-gray-900">
            <a href="/">The Bharat Bulletin</a>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("India")}
            >
              India
            </button>
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("World")}
            >
              World
            </button>
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("Business")}
            >
              Business
            </button>
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("Arts")}
            >
              Arts
            </button>
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("Lifestyle")}
            >
              Lifestyle
            </button>
            <button
              className="hover:text-gray-900"
              onClick={() => handleCategoryClick("Sports")}
            >
              Sports
            </button>

            {/* Search Bar */}
            <div className="flex items-center w-full max-w-md mx-auto">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring focus:ring-sky-300 text-sm"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-red-400 text-white rounded-r-lg hover:bg-red-800 focus:ring focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <a
                  href="/subscribe"
                  className="px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-700 rounded hover:bg-blue-100"
                >
                  Subscribe
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-800"
                >
                  Log In
                </a>
              </>
            ) : (
              <div className="relative">
                {/* User Avatar */}
                <div
                  onClick={toggleDropdown}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold cursor-pointer"
                  title={user.username}
                >
                  {user.username[0].toUpperCase()}
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-50">
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <a
                          href="/myaccount"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Account
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
