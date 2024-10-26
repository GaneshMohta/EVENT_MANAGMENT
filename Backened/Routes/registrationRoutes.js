const express = require('express');
const { registerForEvent , registrationDetail, analysisRegistration, registerEvents } = require('../Controller/registrationController');
const router = express.Router();

router.post('/register', registerForEvent);
router.get('/:id',registrationDetail);
router.get('/analysis/:id',analysisRegistration);
router.get('/register/events',registerEvents);
module.exports = router;
