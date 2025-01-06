import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Home/navigation';
import './Profile.css';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: ''
  });

  const [reservations, setReservations] = useState([
    {
      id: 1,
      titre: "Le Livre des Secrets",
      auteur: "John Doe",
      prix: 150.00,
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      titre: "L'Aventure Infinie",
      auteur: "Jane Smith",
      prix: 200.00,
      imageUrl: "https://via.placeholder.com/150"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);

  const navigate = useNavigate();

  // Load user information from localStorage when the component mounts
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
      setUpdatedUserInfo(storedUserInfo);  // Set updatedUserInfo to the same value initially
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the updated user info to localStorage and update state
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUserInfo));
    setUserInfo(updatedUserInfo);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value
    });
  };

  return (
    <div>
      <Navigation />
      <div className="profile-container">
        {/* Profil Header */}
        <div className="profile-header">
          <div className="profile-image">
            <img src={userInfo.imageUrl} alt="Profile" />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={updatedUserInfo.fullname}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  name="email"
                  value={updatedUserInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={updatedUserInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
                <input
                  type="text"
                  name="address"
                  value={updatedUserInfo.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
                <button onClick={handleSaveClick} className="save-button">Save</button>
              </>
            ) : (
              <>
                <h1>{userInfo.fullname}</h1>
                <p>{userInfo.email}</p>
                <p>{userInfo.phone}</p>
                <p>{userInfo.address}</p>
                <button onClick={handleEditClick} className="edit-button">Modifier le profil</button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main-content">
          {/* Sidebar */}
          <div className="sidebar">
            <button className="sidebar-button">Informations personnelles</button>
            <button className="sidebar-button">Mes réservations</button>
            <button className="sidebar-button">Paramètres</button>
          </div>

          {/* Reservations */}
          <div className="main-content">
            <h2>Mes réservations</h2>
            <div className="reservation-cards">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="reservation-card">
                  <img src={reservation.imageUrl} alt={reservation.titre} />
                  <h4>{reservation.titre}</h4>
                  <p>Auteur: {reservation.auteur}</p>
                  <p>Prix: {reservation.prix} MAD</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
