
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainers');

router.post('/register' , trainerController.trainerRegistration);

router.get('/login' , trainerController.trainerLogin);

module.exports = router;