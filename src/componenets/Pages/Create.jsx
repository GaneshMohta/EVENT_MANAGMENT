import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Nabvar from '../Nabvar';
import axios from 'axios'
import './pages.css'
import { useDispatch } from 'react-redux';
import { addEventAsync } from '../../Redux/eventsSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [price, setPrice] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [registrationSeats, setRegistrationSeats] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [date , setDate] = useState('');

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setEventImage(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      alert('Please upload a valid image.');
    }
  };

  const Navigate= useNavigate();

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventType', eventType);
    formData.append('eventName', eventName);
    formData.append('speakerName', speakerName);
    formData.append('price', price);
    formData.append('eventDescription', eventDescription);
    formData.append('registrationSeats', registrationSeats);
    formData.append('eventImage', eventImage);
    formData.append('Date',date);

    console.log('Event Data:', formData);

    const response=await axios.post('http://localhost:3003/post/event',formData);

    if(response.status === 201){
      Navigate('/create')
    }

    // dispatch(AddEvents({eventType : eventType, data: {eventName:eventName}}))

    // const eventData = {
    //   eventType,
    //   data : {
    //     eventName,
    //     speakerName,
    //     price,
    //     eventDescription,
    //     registrationSeats,
    //     eventImage,
    //     date
    //   }
    // };

    // dispatch(addEventAsync(eventData));
  };

  return (
    <div>
      <Nabvar />

      <div className="bg-slate-400 h-auto  pb-8 create">
        <h1 className="text-red-400 text-5xl text-center mb-8 ">ORGANIZE AN EVENT</h1>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label className="text-xl mb-2">Select Event Type:</label>
          <select
            className="w-64 mb-4 p-2"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
            <option value="in-person">In-person</option>
          </select>
          <input
            className="w-64 mb-4 p-2"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            className="w-64 mb-4 p-2"
            type="text"
            placeholder="Speaker Name"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
            required
          />

          <input
            className="w-[100%] mb-4 p-2"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <textarea
            className=" mb-4 p-2"
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            rows="4"
            required
          />

          <input
            className="w-[100%] mb-4 p-2"
            type="number"
            placeholder="Registration Seats"
            value={registrationSeats}
            onChange={(e) => setRegistrationSeats(e.target.value)}
            required
          />

          <label className="mb-4">Upload Event Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <input type='date'
            onChange={(e)=>setDate(e.target.value)}
            required
          />
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Event Preview" className="w-64 h-64 object-cover" />
            </div>
          )}

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
