const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.post('/create', employeeController.createEmployee);
router.post('/json/create', employeeController.createJSONEmployee);



module.exports = router;