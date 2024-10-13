import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './eve3.css';
import axios from 'axios'
import Navbar from '../../Nabvar'; // Ensure the correct spelling and path

const Inperson = () => {

  const [inpersonEvents, setInpersonEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3003/post/event');
        const events = response.data;

        console.log(events)
        const inperson = events.filter(event => event.eventType == "in-person");
        setInpersonEvents(inperson);
      } catch (err) {
        setError(err.message || 'Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [role, setRole] = useState('');
  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'user';
    setRole(userRole);
  }, []);

  if (role === 'admin') {
    return (
      <div>
        <Navbar />
        <div className="main-container">
          <div className="image-container">
            <img
              className="event-img"
              src="https://img.freepik.com/premium-vector/flat-vector-friendly-smiling-man-waving-hand-saying-hello-hi-hola-concept-illustration_939213-661.jpg?semt=ais_hybrid"
              alt="Organizer Illustration"
            />
          </div>

          <div className="text-container">
            <h1 className="header-title">Hey Organizer</h1>
            <p className="description">Manage Your Events and Your Trade Show</p>
            <br />
            <Link to="/Virtual">
              <button className="explore-button bg-black text-white text-xs">
                Organize Events
              </button>
            </Link>
          </div>
        </div>

        <hr />
        <br />

        <div className="">
          <div className="text-center mb-2">
            <h1 className="font-semibold text-gray-500 text-2xl text-center">
              Manage Your Events
            </h1>
          </div>
          <div>
            <div className="event-cards">
              <div className="card in-person text-center">
                <h2>Upcoming Events</h2>
                <Link className="" to="/Upcoming">
                  <button className="explore-button">Explore More</button>
                </Link>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTq4ytPUHWbVv_0kFwMtLr5T_7SUGZ5EA&s"
                  alt="In-person event"
                  className="event-image"
                />
              </div>
              <div className="card virtual text-center">
                <h2>Past Events</h2>
                <Link to="/Virtual">
                  <button className="explore-button">Explore More</button>
                </Link>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEOEx-WSVOw-4lcPPE9uJJpy4aHPOScG7gQ&s"
                  alt="Virtual event"
                  className="event-image"
                />
              </div>
            </div>
            <br />
            <hr />
          </div>
        </div>

        <footer className="footer">
          <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="image-container">
          <img
            className="event-img"
            src="https://img.freepik.com/premium-vector/flat-vector-friendly-smiling-man-waving-hand-saying-hello-hi-hola-concept-illustration_939213-661.jpg?semt=ais_hybrid"
            alt="Organizer Illustration"
          />
        </div>

        <div className="text-container">
          <h1 className="header-title">Hey User</h1>
          <p className="description">Book Your Events and Your Trade Show</p>
          <br />
        </div>
      </div>

      <section id="events" className="event-section">
        <h2>Upcoming Inperson Events</h2>
        <div className="events-container">
          {/* {loading && <p>Loading events...</p>} */}
          {/* {error && <p>Error: {error}</p>} */}
          { inpersonEvents.length > 0 ? (
            inpersonEvents.map((event, index) => (
              <div className="event-card" key={index}>
                <img src={`http://localhost:3003/${event.eventImage}`} alt={event.eventName} />
                <h3>{event.eventName}</h3>
                <p>{event.eventDescription}</p>
                <Link to={`${event._id}`} >
                <button className="details-btn">Details</button></Link>
              </div>
            ))
          ) : (
            <p>No Inperson events available at the moment.</p>
          )}
        </div>
      </section>


      <footer className="footer">
        <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Inperson;
