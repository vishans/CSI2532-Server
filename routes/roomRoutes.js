const express = require('express');
const roomController  = require('../controllers/roomController'); 
const router = express.Router();


router.route('/book').post(roomController.bookRoom)

 


module.exports = router;