import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Nabvar';
import axios from 'axios';
import Popup from '../Popup';
import "./eve3.css";
import Payment from '../Payment';
import * as d3 from "d3";


export default function EveDet() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('user');
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age,setAge] = useState('');
  const [gender,setGender] = useState("Male");
  const [location , setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPaymentReady, setPaymentReady] = useState(false);
  const [analysis , setAnalysis] = useState();
  const [registerdEvents,setRegisteredEvents] = useState(0);
  const [cnt , setCnt] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole') || 'user';

    setUserType(userRole);
    setIsAdmin(userRole === 'admin');

    if (email) {
      setUserEmail(email);
      const [name] = email.split('@');
      setUsername(name);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/post/${id}`);
        setEventData(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [id]);

  useEffect(()=>{
    const RegistrationEvent = async() => {
    const Id = localStorage.getItem('userId');
    const registedevent =await axios.get('http://localhost:3003/registration/register/events/');
    console.log("hii",registedevent.data[0])
    if( eventData?._id){
    const filtedevent = registedevent.data.filter(f => f.Eventid === eventData?._id)
     console.log(filtedevent)
    const refilted = filtedevent.filter(f => f.userId === Id);

    console.log("ref",refilted);
    setRegisteredEvents(refilted.length);
    }
  }
  RegistrationEvent();
},[eventData?._id])

  useEffect(() => {
    const fetchRegistration = axios.get(`http://localhost:3003/registration/${id}`);
    const fetchAnalysis = axios.get(`http://localhost:3003/registration/analysis/${id}`);

    Promise.all([fetchRegistration, fetchAnalysis])
      .then(([res1, res2]) => {
        // console.log(res1.data.count);
        // console.log("res2",res2.data);
        setCnt(res1.data.count);

        const pieData = [
          { label: "Registration", value: res1.data.count},
          { label: "Remaining", value: 100 - res1.data.count }
        ];
        createPieChart(pieData);
        setAnalysis(res2.data);
        createBarChart(res2.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [id]);

  const createPieChart = (data) => {
    const width = 350;
    const height = 350;
    const margin = 20;

    const radius = width / 2 - margin;

    d3.select("#pieChart").select("svg").remove();

    const svg = d3
      .select("#pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3
      .pie()
      .value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => `${d.data.label}: ${d.data.value}`)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 15);
  };

  const createBarChart = (data) => {
    const width = 350;
    const height = 350;
    const margin = { top: -20, right: 30, bottom: 40, left: 40 };

    d3.select("#barChart").select("svg").remove();
    const svg = d3
      .select("#barChart")
      .append("svg")
      .attr("width", width  + margin.bottom)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id.gender))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .nice()
      .range([height, 50]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d._id.gender))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "orange");
};




  if (loading) return <p>Loading...</p>;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const eventSubmit = async (e) => {
    e.preventDefault();
    setPaymentReady(true);
  };

  const handlePaymentSuccess = async () => {
    console.log("called");
    console.log(gender);
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post(
        'http://localhost:3003/registration/register',
        {
          userId,
          Eventid: eventData?._id,
          location,
          age,
          gender
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        alert('Registration successful!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3003/post/${id}`, eventData);
      alert('Event updated successfully!');
      handleCloseModal();
    } catch (error) {
      console.log('Event update failed:', error);
      alert('Failed to update the event.');
    }
  };

  return (
    <div className="container1">
      <Navbar />
      <div className="banner">
        <img
          src={`http://localhost:3003/${eventData?.eventImage}`}
          alt={eventData?.eventName}
          className="banner-image"
        />
      </div>
      <div className="content1">
        <div className="event-info">
          <h1>{eventData?.eventName}</h1>
          <p className="event-organization">{eventData?.organization}</p>
          <div className="event-meta">
            <p>📍 {eventData?.eventType}</p>
            <p>📅 Updated On: {eventData?.Date}</p>
            <p>👨‍💼 Speaker: {eventData?.speakerName}</p>
            <p>
              🔗 <Link to={eventData?.website || '#'}>Official Website</Link>
            </p>
          </div>

          <div className="offer-badge">
            {eventData?.offer || 'No special offer'}
          </div>

          <div className="flex justify-center w-[50vw] items-center text-center relative left-[25%]">
            {userType === 'user' ? (
              <div className="registration-panel w-[50vw] text-center">
                <div className="free-tag">
                  ₹ {eventData?.price || 'Free'}
                </div>
                {
                  registerdEvents > 0 ? (<button className="p-3 rounded-sm bg-yellow-400">
                    Already Register
                  </button>):
                  (<button className="register-btn" onClick={handleOpenModal}>
                    Register
                  </button>)
                }

                <div className="detail">
                  <p>👥 Team Size: {eventData?.teamSize || 1}</p>
                  <p>
                    🗓️ Registration Deadline:{' '}
                    {eventData?.deadline || 'N/A'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="admin-panel">
                <button
                  className="update-btn register-btn"
                  onClick={handleOpenModal}
                >
                  Update Event
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      <Popup isOpen={isModalOpen} onClose={handleCloseModal}>
        {userType === 'user' ? (
          <>
            <h2>Register for {eventData?.eventName}</h2>
            <form onSubmit={eventSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  className="text-gray-600"
                  value={username}
                  readOnly
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  className="text-gray-600"
                  value={userEmail}
                  readOnly
                  required
                />
              </label>
              <label>Age :
                <input
                type='text'
                className='text-gray-600'
                value={age}
                onChange={(e)=>setAge(e.target.value)}
                required
                />
              </label>
              <label>Gender :
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                  <option value="Male" >Male</option>
                  <option value="Female">Female</option>
                  <option value="Others" >Others</option>
                </select>
              </label>
              <label>Location :
                <input type='text'
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                required
                />
              </label>
              <p>
                Price: <span>{eventData?.price || 'Free'}</span>
              </p>
              <button type="submit">Proceed to Payment</button>
            </form>
            {isPaymentReady && (
              <Payment
                eventPrice={eventData?.price}
                onUpdate={handlePaymentSuccess}
              />
            )}
          </>
        ) : (
          <>
            <h2>Update {eventData?.eventName}</h2>
            <form onSubmit={handleUpdateEvent}>
              <label>
                Event Name:
                <input
                  type="text"
                  value={eventData?.eventName || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventName: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Event Type:
                <input
                  type="text"
                  value={eventData?.eventType || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventType: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={eventData?.price || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, price: e.target.value })
                  }
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={eventData?.date || ''}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                />
              </label>
              <button type="submit">Update Event</button>
            </form>
          </>
        )}
      </Popup>
      { userType === 'admin' ?
        (<div className='bg-slate-950 text-white'>
          <div className='text-center eve-head'><h1>Event Registration Studies</h1></div>
          <div className='flex justify-evenly event-analysis'>
          <div id="pieChart"> <h1 className='text-center'><span className='text-orange-600'>Collection : </span> ₹{eventData?.price*cnt}</h1></div>

          <div>
          <div id="barChart"><h1 className='text-center text-orange-600'>Gender analysis</h1></div>
          </div>
          </div>

        </div>):(<div></div>)
      }
    </div>
  );
}
