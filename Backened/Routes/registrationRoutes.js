const express = require('express');
const { registerForEvent } = require('../Controller/registrationController');
const router = express.Router();

router.post('/register', registerForEvent);

module.exports = router;
