import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Street Name, City, Country",
    imageUrl: "https://via.placeholder.com/150"
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

  const navigate = useNavigate();

  return (
    <div>
        <Navbar />
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={userInfo.imageUrl} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{userInfo.name}</h1>
          <p>{userInfo.email}</p>
          <p>{userInfo.phone}</p>
          <p>{userInfo.address}</p>
          <button className="edit-button">Modifier le profil</button>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="sidebar">
          <button className="sidebar-button">Informations personnelles</button>
          <button className="sidebar-button">Mes réservations</button>
          <button className="sidebar-button">Paramètres</button>
        </div>

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

      <div className="profile-footer">
        <button className="logout-button" onClick={() => navigate('/')}>Se déconnecter</button>
      </div>
    </div></div>
  );
}

export default Profile;
