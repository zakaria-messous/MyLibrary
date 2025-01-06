import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Confirmation from './components/Confirmation/Confirmation';
import Profile from './components/Profile/Profile';
import LibraryPage from './components/LibraryPage/LibraryPage';
import Reservations from './components/Reservations/Reservations';
import { jwtDecode } from 'jwt-decode'; // Corrected import

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      if (Date.now() < expirationTime) {
        return true; // Token is valid
      } else {
        localStorage.removeItem('token'); // Remove expired token
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token'); // Remove invalid token
    }
  }
  return false; // Token is either absent, expired, or invalid
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Login Redirect Component
const LoginRedirect = () => {
  return isAuthenticated() ? <Navigate to="/library" /> : <Login />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Redirect authenticated users away from login */}
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/library" element={<ProtectedRoute element={<LibraryPage />} />} />
          <Route path="/reservations" element={<ProtectedRoute element={<Reservations />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
