import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Confirmation from './components/Confirmation/Confirmation'; // Import de la page de réservation
import Profile from './components/Profile/Profile'; // Page de profil
import LibraryPage from './components/LibraryPage/LibraryPage';
import Reservations from './components/Reservations/Reservations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} /> {/* Route pour la page de profil */}
          <Route path="/library" element={<LibraryPage />} /> {/* Route pour la page de LibraryPage */}
          <Route path="/reservations" element={<Reservations />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
