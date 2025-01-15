import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Home/navigation';
import './Profile.css';
import axiosInstance from '../../axios'; // Import the custom axios instance

function Profile() {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: ''
  });

  const [reservations, setReservations] = useState([]); // State for storing borrowed books
  const [facturations, setFacturations] = useState([]); // State for storing invoices
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);

  const [showReservations, setShowReservations] = useState(false); // State to toggle between reservations and facturations
  const [showFacturations, setShowFacturations] = useState(false); // State for displaying facturations

  const navigate = useNavigate();

  // Fetch user information from API on component mount
  useEffect(() => {
    axiosInstance.get('/user/me')
      .then((response) => {
        const userData = response.data;
        setUserInfo({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || '',
          address: userData.address || '',
          imageUrl: userData.imageUrl || ''
        });
        setUpdatedUserInfo({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || '',
          address: userData.address || '',
          imageUrl: userData.imageUrl || ''
        });
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  // Fetch reservations (Emprunts)
  const fetchEmprunts = () => {
    axiosInstance.get('/api/emprunts/me')
      .then((response) => {
        setReservations(response.data);
        setShowReservations(true);
        setShowFacturations(false); // Hide facturations when showing reservations
      })
      .catch((error) => {
        console.error('Error fetching emprunts:', error);
      });
  };

  // Fetch facturations
  const fetchFacturations = () => {
    axiosInstance.get('/api/facturation/my')
      .then((response) => {
        setFacturations(response.data);
        setShowFacturations(true);
        setShowReservations(false); // Hide reservations when showing facturations
      })
      .catch((error) => {
        console.error('Error fetching facturations:', error);
      });
  };

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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <Navigation />
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image">
            <img src={userInfo.imageUrl || 'https://via.placeholder.com/150'} alt="Profile" />
          </div>
          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="fullName"
                  value={updatedUserInfo.fullName}
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
                <h1>{userInfo.fullName}</h1>
                <p>{userInfo.email}</p>
                <p>{userInfo.phone}</p>
                <p>{userInfo.address}</p>
                <button onClick={handleEditClick} className="edit-button">Modify Profile</button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main-content">
          {/* Sidebar */}
          <div className="sidebar">
            <button className="sidebar-button" onClick={fetchEmprunts}>My Reservations</button>
            <button className="sidebar-button" onClick={fetchFacturations}>My Invoices</button>
            <button className="sidebar-button" onClick={handleLogout}>Logout</button>
          </div>

          {/* Display Reservations (Emprunts) */}
          {showReservations && (
            <div className="main-content">
              <h2>My Reservations</h2>
              <div className="reservation-cards">
                {reservations.length > 0 ? (
                  reservations.map((reservation) => (
                    <div key={reservation.id} className="reservation-card">
                      <p><strong>Book ID:</strong> {reservation.id}</p>
                      <p><strong>Status:</strong> {reservation.status}</p>
                      <p><strong>Date Borrowed:</strong> {new Date(reservation.dateEmprunt).toLocaleDateString()}</p>
                      <p><strong>Return Date:</strong> {new Date(reservation.dateRetour).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No reservations found.</p>
                )}
              </div>
            </div>
          )}

          {/* Display Facturations */}
          {showFacturations && (
            <div className="main-content">
              <h2>My Invoices</h2>
              <div className="facturation-cards">
                {facturations.length > 0 ? (
                  facturations.map((facturation) => (
                    <div key={facturation.id} className="facturation-card">
                      <p><strong>Book:</strong> {facturation.livre.titre}</p>
                      <p><strong>Price:</strong> {facturation.prix} MAD</p>
                      <p><strong>Type:</strong> {facturation.type}</p>
                      <p><strong>Date:</strong> {new Date(facturation.dateTransaction).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No invoices found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
