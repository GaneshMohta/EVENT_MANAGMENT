const express = require('express');
const { registerForEvent , registrationDetail, analysisRegistration } = require('../Controller/registrationController');
const router = express.Router();

router.post('/register', registerForEvent);
router.get('/:id',registrationDetail);
router.get('/analysis/:id',analysisRegistration);
module.exports = router;
