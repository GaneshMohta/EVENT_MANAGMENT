import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Event from './componenets/Pages/Event'
import Inperson from './componenets/Pages/Events3/Inperson';
import Register from './componenets/Validation/Register';
import Login from './componenets/Validation/Login';
import Upcoming from './componenets/Pages/Events3/Upcoming';
import Create from './componenets/Pages/Create';
import Hybrid from './componenets/Pages/Events3/Hybrid';
import EveDet from './componenets/Pages/Events3/EveDet';
import Past from './componenets/Pages/Events3/Past';
import Virtual from './componenets/Pages/Events3/Virtual';
import About from './componenets/Pages/About';
import Myevents from './componenets/Pages/Events3/Myevents';
import PastAnalysis from './componenets/Pages/Events3/PastAnalysis';

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Event />}></Route>
        <Route path='/In-person' element={<Inperson />}></Route>
        <Route path='/Sign-up' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Upcoming' element={<Upcoming />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/hybrid' element={<Hybrid />}></Route>
        <Route path='Upcoming/:id' element={<EveDet />}></Route>
        <Route path='in-person/:id' element={<EveDet />}></Route>
        <Route path='/hybrid/:id' element={<EveDet />}></Route>
        <Route path='/past/:id' element={<PastAnalysis/>}></Route>
        <Route path='/Virtual/:id' element={<EveDet />}></Route>
        <Route path='/past' element={<Past />}></Route>
        <Route path='/Virtual' element={<Virtual />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/myevents' element={<Myevents/>}></Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
