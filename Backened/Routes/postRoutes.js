const express = require('express');
const multer = require('multer');
const { createEvent, getAllEvents, getEventById, deleteEvent, updateEventById} = require('../Controller/postController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/event', upload.single('eventImage'), createEvent);
router.get('/event', getAllEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEventById);

module.exports = router;
