import React from 'react'
import Nabvar from '../../Nabvar'
import { Link } from 'react-router-dom'

export default function EveHeaderBody() {
  const userRole = localStorage.getItem('userRole') || 'user';
  return (
    <div>
      <Nabvar />
      <div className='main-container'>
        <div className='image-container'>
          <img
            className='event-img'
            src='https://img.freepik.com/premium-vector/flat-vector-friendly-smiling-man-waving-hand-saying-hello-hi-hola-concept-illustration_939213-661.jpg?semt=ais_hybrid'
            alt='Organizer Illustration'
          />
        </div>
        {userRole === "user" ? (<div className='text-container'>
          <h1 className='header-title'>Hey User</h1>
          <p className='description'>Book Your Events and Your Trade Show</p>
          <br />
        </div>): (<div className='text-container'>
          <h1 className='header-title'>Hey Organizer</h1>
          <p className='description'>Manage Your Events and Your Trade Show</p>
          <br />
        </div>)}

      </div>
    </div>
  )
}
