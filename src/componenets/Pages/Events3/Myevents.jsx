import React, { useEffect,useState } from 'react'
import Navbar from '../../Nabvar'
import axios from 'axios'

const Myevents = () => {
  const id = localStorage.getItem('userId');
  const [events,setEvents] = useState([]);
  let   [myevent,setMyevent] = useState([]);

  useEffect(()=>{
    const fetchdata=async()=>{
     const response =await axios.get(`https://event-managment-1l2o.onrender.com/registration/register/events`);
    const refilted = response.data.filter(f => f.userId === id);
    setEvents(refilted);
    }
    fetchdata();
  },[]
)

useEffect(() => {
  const fetchdata = async () => {
    try {
      const requests =await events.map((eve) =>
        axios.get(`https://event-managment-1l2o.onrender.com/post/${eve.Eventid}`)
      );
      const results = await Promise.all(requests);
      setMyevent(results.map(result => result.data));
      console.log(myevent)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchdata();
}, [events]);




  return (
    <div>
      <Navbar />
      <div className='bg-gray-300 text-center p-2 text-orange-600'><h1>Registered Events</h1></div>
      <div>
        {
          myevent.length > 0 ? (
          myevent.map((eve)=>(

              <div className='eve-container'>
                <div className='w-[50%]'>
                <img src={`https://event-managment-1l2o.onrender.com/${eve.eventImage}`}/>
                </div>
                <div className='eve-content w-[50%]'>
                <h1>{eve.eventName}</h1>
                <p>{eve.eventType}</p>
                <p>₹:{eve.price}</p>
                <p className='text-xs'>Event Date: {new Date(eve.Date).toLocaleDateString()}</p>
                </div>
              </div>
            )
          )
        ):(<div></div>)
        }
      </div>

    </div>
  )
}

export default Myevents
