
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');

router.get('/getStudent/:id' , studentController.getStudent);

router.get('/getBatchmates/:courseName/:batchName' , studentController.getBatchmates);

module.exports = router;
