const Event = require('../Model/postSchema');
const { v4: uuidv4 } = require('uuid');
const createEvent = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file.filename);
    const EventId=uuidv4();
    const newEvent = new Event({
      EventId,
      eventType: req.body.eventType,
      eventName: req.body.eventName,
      speakerName: req.body.speakerName,
      price: req.body.price,
      eventDescription: req.body.eventDescription,
      registrationSeats: req.body.registrationSeats,
      eventImage: req.file ? req.file.path : '',
      Date : req.file.Date
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = {
      eventType: req.body.eventType,
      eventName: req.body.eventName,
      speakerName: req.body.speakerName,
      price: req.body.price,
      eventDescription: req.body.eventDescription,
      registrationSeats: req.body.registrationSeats,
      eventImage: req.file ? req.file.path : undefined, // Optional image update
      Date: req.body.Date,
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createEvent, getAllEvents, getEventById, deleteEvent, updateEventById };
