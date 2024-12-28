import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on page load
    if (user) {
      axios.get(`/api/user/${user._id}`)
        .then(response => {
          setUserData(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(err => console.error("Failed to fetch user data", err));
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    axios.put(`/api/user/update/${user._id}`, { name, email })
      .then(response => {
        setUserData(response.data);
        setIsEditing(false);
      })
      .catch(err => console.error("Failed to update user data", err));
  };

  const handleCancelEdit = () => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-3xl font-semibold">
            {userData ? userData.name[0].toUpperCase() : "👤"}
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            {isEditing ? (
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-800">{userData?.name || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-800">{userData?.email || "N/A"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Subscription Status</label>
            <p className="text-lg font-semibold text-gray-800">
              {userData?.isSubscribed ? "Subscribed" : "Not Subscribed"}
            </p>
          </div>
        </div>

        {/* Edit Profile / Save Changes */}
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
