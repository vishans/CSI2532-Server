const express = require('express');
const roomController  = require('../controllers/roomController'); 
const router = express.Router();


router.route('/book').post(roomController.bookRoom);
router.route('/rent').post(roomController.rentRoom);


 


module.exports = router;