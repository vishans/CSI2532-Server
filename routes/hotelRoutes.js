const express = require('express');
const employerController  = require('../controllers/hotelController');
const router = express.Router();

router.route('/newclient').post(employerController.createClient)
router.route('/verify').get(employerController.verify)

 


module.exports = router;