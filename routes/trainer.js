
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainers');

// router.post('/register' , trainerController.trainerRegistration);

// router.get('/login' , trainerController.trainerLogin);

////End Points for Trainer Calender
router.post('/addEvent' , trainerController.addEvent);

router.get('/getAllEvent' , trainerController.getAllEvent);

module.exports = router;