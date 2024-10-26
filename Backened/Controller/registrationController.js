const Event = require("../Model/postSchema");
const Registration = require("../Model/registrationSchema");
const mongoose = require("mongoose");
const User = require("../Model/userSchema")

const registerForEvent = async (req, res) => {
  const { userId, Eventid, location, age, gender } = req.body;
  console.log(userId, Eventid);

  try {
    const event = await Event.findById(Eventid);
    if (!event) {
      console.log("hii");
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.registrationSeats <= 0) {
      return res.status(404).json({ message: "No seats available" });
    }

    const newRegistration = new Registration({
      userId,
      Eventid,
      location,
      age,
      gender,
    });

    await newRegistration.save();

    event.registrationSeats -= 1;
    await event.save();

    res.status(201).json({ message: "Registration successful", event });
    console.log("Registration successful");
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registrationDetail = async (req, res) => {
  try {
    const detail = await Registration.find({ Eventid: req.params.id });
    console.log(detail);
    if (!detail) {
      return res.status(404).json({ message: "Registration not found" });
    }
    return res.json({ count: detail.length });
  } catch (error) {
    console.error("Error fetching registration details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const analysisRegistration = async (req, res) => {
  try {
    const analyts = await Registration.aggregate([
      { $match: { Eventid: req.params.id } },
      {
        $group: {
          _id: {
            gender: "$gender",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(analyts);
  } catch (e) {
    console.log("error in analayts :", e);
    res.status(500).json({ message: "Issue is there" });
  }
};

const registerEvents = async (req, res) => {
  try {
    const registers = await Registration.aggregate([
    {$lookup: { from: 'users', localField: 'userId', foreignField: 'userId', as: 'userDetails' }},{
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true
      }
    },{
      $project: {
        userId: 1,
        Eventid: 1,
        registeredAt: 1,
        location: 1,
        age: 1,
        gender: 1,
        'userDetails.email': 1,
        'userDetails.role': 1
      }
    }]);
    console.log("reg",registers)
    res.json(registers);
  } catch (e) {console.log(e)}

};


module.exports = { registerForEvent, registrationDetail, analysisRegistration,registerEvents };
