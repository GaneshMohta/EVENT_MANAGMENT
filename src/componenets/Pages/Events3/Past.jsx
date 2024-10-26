import React,{useState , useEffect} from 'react'
import axios from 'axios';
import './eve3.css';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../Nabvar';


export default function Past() {
    const location =useLocation();
    const [inpersonEvents, setInpersonEvents] = useState([]);
    const [error, setError] = useState(null);
    const eventtype = location.state.eventType || {};
    console.log("Type",eventtype);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:3003/post/event');
          const events = response.data;

          console.log(events)
          const inperson = events.filter((event) =>
            {return (
                event.eventType == eventtype &&  new Date(event.Date) < Date.now()
            )});
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
        <Navbar />

        <section className="welcome-section">
          <h1>Welcome to Utsaav</h1>
          <p>Explore the future of what is possible at Utsaav. Join developers, creators, and designers to learn the latest tech, connect with experts, and get inspired.</p>
        </section>

        <section id="events" className="event-section">
          <h2>Past {eventtype} Events</h2>
          <div className="events-container">
            {error && <p>Error: {error}</p>}
            { inpersonEvents.length > 0 ? (
              inpersonEvents.map((event, index) => (
                <div className="event-card" key={index}>
                  <img className='img' src={`http://localhost:3003/${event.eventImage}`} alt={event.eventName} />
                  <h3>{event.eventName}</h3>
                  <p>{event.eventDescription}</p>
                  <Link to={`${event._id}`} >
                  <button className="details-btn">Details</button></Link>
                </div>
              ))
            ) : (
              <p>No {eventtype} events available at the moment.</p>
            )}
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
        </footer>
      </div>
    );
};