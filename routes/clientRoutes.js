const express = require('express');
const clientController  = require('../controllers/clientController');
const router = express.Router();

router.route('/rooms/').get(clientController.getRooms);
router.route('/bookings/').get(clientController.getBookings);

 


module.exports = router;