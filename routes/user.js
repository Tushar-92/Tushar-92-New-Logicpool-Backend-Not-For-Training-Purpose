
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/register' , userController.userRegistration);

router.post('/login' , userController.userLogin);

module.exports = router;