const Event = require('../Model/postSchema');
const Registration = require('../Model/registrationSchema');
const mongoose = require('mongoose');

const registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }

    const objectIdEventId = new mongoose.Types.ObjectId(eventId);

    const event = await Event.findById(objectIdEventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registrationSeats <= 0) {
      return res.status(400).json({ message: 'No seats available for this event' });
    }

    const newRegistration = new Registration({ userId, eventId: objectIdEventId });
    await newRegistration.save();

    event.registrationSeats -= 1;
    await event.save();

    res.status(201).json({ message: 'Registration successful', event });
    console.log("success");
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerForEvent };
