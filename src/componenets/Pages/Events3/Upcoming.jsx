import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios to fetch data
import './Eve3.css';
import { Link } from 'react-router-dom';

const Upcoming = () => {
  const [inpersonEvents, setInpersonEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://event-managment-1l2o.onrender.com/post/event');
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

  return (
    <div>
      <header className="navbar ">
        <h1 className='logo text-green-300 text-pretty'>UTSAAV</h1>
        <nav>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><a href="#aboutus">Speaker</a></li>
            <li><a href="#contact">Attendance</a></li>
          </ul>
        </nav>
      </header>

      <section className="welcome-section">
        <h1>Welcome to Utsaav</h1>
        <p>Explore the future of what is possible at Utsaav. Join developers, creators, and designers to learn the latest tech, connect with experts, and get inspired.</p>
      </section>

      <section id="events" className="event-section">
        <h2>Upcoming Inperson Events</h2>
        <div className="events-container">
          {/* {loading && <p>Loading events...</p>} */}
          {error && <p>Error: {error}</p>}
          { inpersonEvents.length > 0 ? (
            inpersonEvents.map((event, index) => (
              <div className="event-card" key={index}>
                <img src={`https://event-managment-1l2o.onrender.com/${event.eventImage}`} alt={event.eventName} />
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

export default Upcoming;
