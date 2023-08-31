import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import { lighten } from '@mui/material';

function App() {
  
  let isAuthenticate = !!sessionStorage.getItem('token'); // Check if the user is authenticated
  // Function to automatically log out the user
  function autoLogout() {
    sessionStorage.removeItem('token'); // Remove the token from sessionStorage
    window.location.href = '/'; // Redirect the user to the sign-in page
  }

  useEffect(() => {
   // const isAuthenticated = !!sessionStorage.getItem('token'); // Check if the user is authenticated
    if (isAuthenticate) {
      // Start the auto logout timer on login
      const timeoutId = setTimeout(autoLogout, 6000000); // 10 minutes

      // Clear the timer when the component unmounts (e.g., on logout or token expiry)
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isAuthenticate]);

  const renderProtectedRoute = (element) => {
    let isAuthenticated = !!sessionStorage.getItem('token'); // Check if the user is authenticated
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/phone-verification" element={<PhoneVerificationPage />} />
            <Route path="/dashboard" element={renderProtectedRoute(<DashboardPage />)} />
            <Route path="/contact" element={renderProtectedRoute(<ContactsPage />)} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
