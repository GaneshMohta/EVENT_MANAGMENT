import React, { useEffect,useState } from 'react'
import Navbar from '../../Nabvar'
import axios from 'axios'

const Myevents = () => {
  const id = localStorage.getItem('userId');
  const [events,setEvents] = useState([]);
  let   [myevent,setMyevent] = useState([]);

  useEffect(()=>{
    const fetchdata=async()=>{
     const response =await axios.get(`http://localhost:3003/registration/register/events/`);
    const refilted = response.data.filter(f => f.userId === id);
    setEvents(refilted);
    }
    fetchdata();
  },[]
)

useEffect(() => {
  const fetchdata = async () => {
    try {
      const requests = events.map((eve) =>
        axios.get(`http://localhost:3003/post/${eve.Eventid}`)
      );
      const results = await Promise.all(requests); // Await all promises in parallel

      // If you want to store the results in `myevent`, make sure it's a state variable.
      setMyevent(results.map(result => result.data)); // Assuming you have setMyevent to update state
      console.log(myevent)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchdata();
}, [events]);

// useEffect(()=>{
//  const fetchdata=async()=>{
//   try{
//     const request = await refilted.map((eve)=>(axios.get(`http://localhost:3003/post/${eve.Eventid}`)));
//     const result = await Promise.all(request);
//     setMyevent(result.map(result=>result.data));
//     console.log(myevent)
//   }
//   catch (e){

//   }
//  }
//  fetchdata();
// },[])


  return (
    <div>
      <Navbar />
{/* 
      <div className='bg-slate-200 flex justify-evenly p-2'>
        <h1>Live</h1>
        <h1>Past</h1>
      </div> */}
      <div>
        {
          myevent.length > 0 ? (
          myevent.map((eve)=>(
              <div className='eve-container'>
                <div className='w-[50%]'>
                <img src={`http://localhost:3003/${eve.eventImage}`}/>
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
