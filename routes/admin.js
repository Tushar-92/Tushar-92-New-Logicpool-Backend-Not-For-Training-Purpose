
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

////End Points For Courses
router.post('/addCourse' , adminController.addCourse);

router.get('/getCourse' , adminController.getCourse);

router.get('/getAllCourse' , adminController.getAllCourse);

router.put('/updateCourse/:id' , adminController.updateCourse);

router.delete('/deleteCourse/:id' , adminController.deleteCourse);


////End Points For Modules
router.post('/addModule' , adminController.addModule);

router.get('/getModule' , adminController.getModule);

router.get('/getAllModule' , adminController.getAllModule);

router.put('/updateModule/:id' , adminController.updateModule);

router.delete('/deleteModule/:id' , adminController.deleteModule);


////End Points For Module Topics
router.post('/addTopic' , adminController.addTopic);

router.get('/getTopic' , adminController.getTopic);

router.put('/updateTopic/:id' , adminController.updateTopic);

router.delete('/deleteTopic/:id' , adminController.deleteTopic);



module.exports = router;