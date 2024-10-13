import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Nabvar';
import axios from 'axios';
import Popup from '../Popup';
import './Eve3.css';

export default function EveDet() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('user');
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from local storage
    const email = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole') || 'user';

    setUserType(userRole);
    setIsAdmin(userRole === 'admin');

    if (email) {
      setUserEmail(email);
      const [name] = email.split('@');
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/post/${id}`);
        setEventData(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const eventSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post('http://localhost:3003/registration/register', {
        userId,
        eventId: eventData?._id,
      });

      if (response.status === 201) {
        alert('Registration successful!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3003/post/${id}`, eventData);
      alert('Event updated successfully!');
      handleCloseModal();
    } catch (error) {
      console.error('Event update failed:', error);
      alert('Failed to update the event.');
    }
  };

  return (
    <div className="container1">
      <Navbar />
      <div className="banner">
        <img
          src={`http://localhost:3003/${eventData?.eventImage}`}
          alt={eventData?.eventName}
          className="banner-image"
        />
      </div>
      <div className="content1">
        <div className="event-info">
          <h1>{eventData?.eventName}</h1>
          <p className="event-organization">{eventData?.organization}</p>
          <div className="event-meta">
            <p>📍 {eventData?.eventType}</p>
            <p>📅 Updated On: {eventData?.date}</p>
            <p>
              🔗 <Link to={eventData?.website || '#'}>Official Website</Link>
            </p>
          </div>

          <div className="offer-badge">{eventData?.offer || 'No special offer'}</div>

          <div className='flex justify-center w-[50vw] items-center text-center relative left-[25%]'>
          {userType === 'user' ? (
            <div className="registration-panel w-[50vw] text-center">
              <div className="free-tag">₹ {eventData?.price || 'Free'}</div>
              <button className="register-btn" onClick={handleOpenModal}>
                Register
              </button>
              <div className="detail">
                <p>👥 Team Size: {eventData?.teamSize || 1}</p>
                <p>🗓️ Registration Deadline: {eventData?.deadline || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <div className="admin-panel">
              <button className="update-btn register-btn" onClick={handleOpenModal}>
                Update Event
              </button>
              <button className='register-btn' onClick={() => navigate(`/manage-speakers/${id}`)}>
                Manage Speakers
              </button>
              <button className=' register-btn' onClick={() => navigate(`/case-studies/${id}`)}>
                View Case Studies
              </button>
            </div>
          )}</div>
        </div>
      </div>
      <Popup isOpen={isModalOpen} onClose={handleCloseModal}>
        {userType === 'user' ? (
          <>
            <h2>Register for {eventData?.eventName}</h2>
            <form onSubmit={eventSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  className="text-gray-600"
                  value={username}
                  readOnly
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  className="text-gray-600"
                  value={userEmail}
                  readOnly
                  required
                />
              </label>
              <p>
                Price: <span>{eventData?.price || 'Free'}</span>
              </p>
              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h2>Update {eventData?.eventName}</h2>
            <form onSubmit={handleUpdateEvent}>
              <label>
                Event Name:
                <input
                  type="text"
                  value={eventData?.eventName || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventName: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Event Type:
                <input
                  type="text"
                  value={eventData?.eventType || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventType: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={eventData?.price || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, price: e.target.value })
                  }
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={eventData?.date || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                />
              </label>
              <button type="submit">Update Event</button>
            </form>
          </>
        )}
      </Popup>
    </div>
  );
}
