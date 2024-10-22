const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/userSchema');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const userId = uuidv4();

    user = new User({userId, email, password, role });
    await user.save();
    const token = jwt.sign({ user: { email: user.email, role: user.role } }, 'a1s2d3f4', { expiresIn: '1h' });
    res.status(201).json({userId, token });
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("notid")
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("notmatch")
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        email: user.email,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, 'a1s2d3f4', { expiresIn: '1h' });

    res.json({userId:user.userId, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
