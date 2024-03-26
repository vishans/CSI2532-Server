const express = require('express');
const hotelController  = require('../controllers/hotelController');
const router = express.Router();

router.route('/newclient').post(hotelController.createClient)
router.route('/verify').get(hotelController.verify)

 


module.exports = router;