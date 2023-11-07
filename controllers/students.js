
const LogicpoolStudents = require('../models/students');
const LogicpoolCourses = require('../models/courses');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

async function getStudent(req, res) {

    try {
        let result = await LogicpoolStudents.find({ userID : req.params.id });
        if(result.length > 0) return res.status(200).json({result , status: true});
        else return res.status(404).json({message: 'No Student Record Found For Required _id' , status: false});    
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`}); 
    }
}


async function getBatchmates(req, res) {

    try {
        let incomingCourseName = req.params.courseName;
        let incomingBatchName = req.params.batchName;

        // console.log(incomingCourseName);
        // console.log(incomingBatchName);
        let result = await LogicpoolStudents.find({ courseName: incomingCourseName , batchName: incomingBatchName});
        if(result.length > 0) return res.status(200).json({result , status: true});
        else return res.status(404).json({message: 'No Student Record Found' , status: false});    
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`}); 
    }
}






module.exports = {
    getStudent,
    getBatchmates
    
}
