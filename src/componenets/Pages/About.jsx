import React from 'react'
import Navbar from '../Nabvar'


export default function About() {
  return (
    <div>
    <Navbar />
    <div className='text-center p-2 h-auto '>
      <h1 className='text-orange-600'>Plan, run, and analyze your event— all from one place</h1>
      <div className='flex flex-col items-center justify-center content-center'>
      <p>No more juggling tools, no more frustrating busy work.
         Utsaav Backstage is the fully-customizable event management platform that lets you do it all—from organizing
          your event to measuring its impact and everything in between.
      </p>
    </div>

    <div className='text-center p-2'>
    <p>
        Event management software is a comprehensive technology solution designed to assist event planners in organizing various types of events,
        such as conferences, workshops, and trade shows, across different formats like onsite, online, and hybrid.
        It streamlines the entire event planning process, from building an event website and managing ticketing to handling event day operations,
        including check-in, badging, session management, and event analytics.
        event day operations like check-in and badging, session management, and event analytics
    </p>
    </div>
    </div>
    <footer className="footer relative -bottom-32">
        <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
    </footer>
    </div>
  )
}
