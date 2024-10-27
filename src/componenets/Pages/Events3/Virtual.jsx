import React,{useState,useEffect} from 'react'
import './eve3.css'
import EveHeaderBody from './EveHeaderBody'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Virtual() {
    const [role, setRole] = useState('');
    const [inpersonEvents, setInpersonEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('https://event-managment-1l2o.onrender.com/post/event');
          const events = response.data;

          console.log(events)
          const inperson = events.filter(event => event.eventType == "virtual" && new Date(event.Date) > Date.now());
          setInpersonEvents(inperson);
        } catch (err) {
          setError(err.message || 'Error fetching events');
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, []);
    useEffect(() => {
      const userRole = localStorage.getItem('userRole') || 'user';
      setRole(userRole);
    }, []);
    return (
      <div>
      <EveHeaderBody/>
      <div className="event-section">
      <h2 className="event-heading">Virtual event management made easy</h2>

        <div className="content-wrapper">

          <div className="left-content">
            <img
              src="https://www.zohowebstatic.com/sites/zweb/images/backstage/hybrid-events/build-beautiful-on-brand-websites.webp"
              alt="Event themes preview"
              className="event-image"
            />
          </div>


          <div className="right-content">
            <div className="content-block">
              <h3>Build beautiful, on-brand websites</h3>
              <p>
                Quickly launch a professional-looking, mobile responsive, and fully branded website
                for your event—no design or coding skills necessary. Even better: you can make it
                multilingual and attract an international audience.
              </p>
            </div>

            <div className="content-block">
              <h3>Grow your audience with multichannel marketing</h3>
              <p>
                Be where your attendees are. Promote your event in multiple ways and reach a broader
                audience using a combination of SEO, promo codes, email campaigns, social media,
                referrals, and more.
              </p>
            </div>
          </div>
        </div>
        <br  />
        <hr />
        <br />
        <div className='text-center mb-2'><h1 className='font-semibold text-gray-500 text-2xl text-center'>Manage Your Events</h1></div>

      </div>
      {
        role === 'user' ? (
          <section id="events" className="event-section">
          <h2>Upcoming Virtual Events</h2>
          <div className="events-container">

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
              <p>No Virtual events available at the moment.</p>
            )}
          </div>
        </section>
        ):(
          <div className="event-cards event-section">
          <div className="card in-person text-center">
            <h2>Upcoming Events</h2>



            <Link className='' to="/Upcoming" state={{eventType:"virtual"}}><button className="explore-button">Explore More</button></Link>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTq4ytPUHWbVv_0kFwMtLr5T_7SUGZ5EA&s"
              alt="In-person event"
              className="event-image"
            />
          </div>
          <div className="card virtual text-center">
            <h2>Past Events</h2>
            <Link Link to="/Past" state={{eventType:"virtual" }}><button className="explore-button">Explore More</button></Link>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEOEx-WSVOw-4lcPPE9uJJpy4aHPOScG7gQ&s"
              alt="Virtual event"
              className="event-image"
            />
          </div>
        </div>
        )
      }
      <footer className="footer pt-0">
          <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
      </footer>
      </div>
    )
}
