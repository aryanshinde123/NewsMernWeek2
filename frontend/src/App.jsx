import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Tailwind styles should be included here
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import SubscribePage from './pages/SubscribePage';
import { UserProvider } from './context/userContext';
import MyAccount from './components/MyAccount';
import NewsDescription from './pages/NewsDescription';

function App() {
  return (
    <UserProvider>
    <Router>
      <div>
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/subscribe' element={<SubscribePage/>} />
          <Route path='/myaccount' element={<MyAccount/>} />
          <Route path='/news/:slug' element={<NewsDescription/>} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
