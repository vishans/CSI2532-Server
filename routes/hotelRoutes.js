const express = require('express');
const employerController  = require('../controllers/hotelController');
const router = express.Router();

router.route('/newclient').post(employerController.createClient)
 


module.exports = router;