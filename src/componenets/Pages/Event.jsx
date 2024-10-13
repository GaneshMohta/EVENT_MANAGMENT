import React from 'react'
import { Link } from 'react-router-dom'
import './pages.css'
import Nabvar from '../Nabvar'

const Event = () => {
  return (
    <div>
      <Nabvar />
{/*
      <header className="navbar">
            <h1 className='logo text-green-300 text-pretty'>UTSAAV</h1>
            <nav>
                <ul>
                    <li><Link to='/' >HOME</Link></li>
                    <li><a href="#aboutus">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

            </nav>
        </header> */}

        <section id="home" className="content">
            <div className="content" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <h1 className='mb-0'>WELCOME</h1>
                <p className='text-green-300'>Enjoy, Explore, Event !</p>
                <div className="button-container">
                    <Link to="/Create">
                        <button type="button" id='get-started'>GET STARTED</button>
                    </Link>
                </div>
            </div>
        </section>
        <div className="event-container bg-gray-300">
      <h1 className="event-title text-black">The simplest way to manage all your events</h1>
      <div className="event-cards">
        <div className="card in-person">
          <h2>In-person events</h2>
          <p>Keep it all together at the venue</p>
          <Link to="/In-person" ><button className="explore-button">Explore More</button></Link>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTq4ytPUHWbVv_0kFwMtLr5T_7SUGZ5EA&s"
            alt="In-person event"
            className="event-image"
          />
        </div>
        <div className="card virtual">
          <h2>Virtual events</h2>
          <p>Go beyond webinars and workshops</p>
          <Link to="/Virtual"><button className="explore-button">Explore More</button></Link>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEOEx-WSVOw-4lcPPE9uJJpy4aHPOScG7gQ&s"
            alt="Virtual event"
            className="event-image"
          />
        </div>
        <div className="card hybrid">
          <h2>Hybrid events</h2>
          <p>Merge the physical with the virtual</p>
          <Link to="/Hybrid"><button className="explore-button">Explore More</button></Link>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-43HSn1dl4bWfXRObDJBkvkmKdXkNQg6LA&s"
            alt="Hybrid event"
            className="event-image"
          />
        </div>
      </div>
    </div>

    <footer className='bg-black pb-4 pt-2'>
        <h1 className='text-green-300'>Plan, run, and analyze your event— all from one place</h1>
        <div className='text-center'><span>© 2024, Ganesh@SECE Ltd. All Rights Reserved</span></div>
    </footer>
    </div>
  )
}

export default Event
