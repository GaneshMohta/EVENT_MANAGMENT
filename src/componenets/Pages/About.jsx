import React from 'react'
import Navbar from '../Nabvar'

export default function About() {
  return (
    <div>
      <Navbar></Navbar>
    <div className='text-center text-[7vh] p-2'>
      <h1>Plan, run, and analyze your event— all from one place</h1>
      <p>No more juggling tools, no more frustrating busy work.
         Utsaav Backstage is the fully-customizable event management platform that lets you do it all—from organizing
          your event to measuring its impact and everything in between.
      </p>
    </div>

    <div className='text-center p-2'>
    <h3>
        Event management software is a comprehensive technology solution designed to assist event planners in organizing various types of events,
        such as conferences, workshops, and trade shows, across different formats like onsite, online, and hybrid.
        It streamlines the entire event planning process, from building an event website and managing ticketing to handling event day operations,
        including check-in, badging, session management, and event analytics.
        event day operations like check-in and badging, session management, and event analytics
    </h3>
    </div>
    </div>
  )
}
