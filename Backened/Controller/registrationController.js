const Event = require('../Model/postSchema');
const Registration = require('../Model/registrationSchema');
const mongoose = require('mongoose');

const registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  // if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
  //   return res.status(400).json({ message: 'Invalid userId or eventId format' });
  // }

  try {
    // Convert to ObjectId only after validation
    // const eventObjectId = new mongoose.Types.ObjectId(eventId);
    // const userObjectId = new mongoose.Types.ObjectId(userId);

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registrationSeats <= 0) {
      return res.status(404).json({ message: 'No seats available' });
    }

    const newRegistration = new Registration({
      userId: userId,
      eventId: eventId,
    });

    await newRegistration.save();

    event.registrationSeats -= 1;
    await event.save();

    res.status(201).json({ message: 'Registration successful', event });
    console.log('Registration successful');
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerForEvent };
