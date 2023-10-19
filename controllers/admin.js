
const LogicpoolCourses = require('../models/courses');
const LogicpoolModules = require('../models/modules');
const LogicpoolModuleTopics = require('../models/moduleTopics');
const LogicpoolBatches = require('../models/batches');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


/////// For Courses

async function addCourse(req, res) {
    try {

        let incomingCourseName = req.body.courseName;
        let incomingCourseDuration = req.body.courseDuration;
     
        const newCourse = new LogicpoolCourses({
            courseName: incomingCourseName,
            courseDuration: incomingCourseDuration
        });

        await newCourse.save();
        console.log("New Course Added");
        res.status(201).json({message: "New Course Added Successfully" , status: "true"});

    } catch (err) {
        console.log(err);
        res.status(500).json({Message: err.message});
    }
}

async function getCourse(req, res) {

    try {
        
        let incomingCourseName = req.body.courseName;
        
        let course = await LogicpoolCourses.find({courseName: incomingCourseName});
        
        if(course.length > 0) return res.status(200).json({course , status: "true"});
        else return res.status(404).json({message: 'Course Not Found' , status: "false"});
               
    }catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function getAllCourse(req, res) {
    try {

        let allCourses = await LogicpoolCourses.find(); //This will find all available courses

        if(allCourses.length > 0) return res.status(200).json({allCourses , status: "true"});
        else return res.status(404).json({message: 'No Course Available' , status: "false"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
        
    }
}

async function updateCourse(req, res) {
    try {

        let incomingNewCourseName = req.body.courseName;
        let incomingNewCourseDuration = req.body.courseDuration;

        let updatedCourse = await LogicpoolCourses.findByIdAndUpdate(
            { _id : req.params.id },

            {
                courseName: incomingNewCourseName,
                courseDuration: incomingNewCourseDuration
            },

            {new: true}
        );

        console.log(updatedCourse);
        res.status(200).json({updatedCourse , status: true , message: 'Course Updated Successfully'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function deleteCourse(req, res) {
    try {
        await LogicpoolCourses.deleteOne({ _id : req.params.id});
        console.log(`Course _id: ${req.params.id} is now deleted from the database`);
        res.status(200).json({message: `Course _id: ${req.params.id} is now deleted from the database`});        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}


/////// For Modules

async function addModule(req, res) {
    try {

        let incomingCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        
             
        const newModule = new LogicpoolModules({
            courseName: incomingCourseName,
            moduleName: incomingModuleName
        });

        await newModule.save();
        console.log("New Module Added");
        res.status(201).json({message: "New Module Added Successfully" , status: "true"});

    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error.message});
    }
}

async function getModule(req, res) {

    try {
        
        let incomingModuleName = req.body.moduleName;
        
        let module = await LogicpoolModules.find({moduleName: incomingModuleName});
        
        if(module.length > 0) return res.status(200).json({module , status: "true"});
        else return res.status(404).json({message: 'Module Not Found' , status: "false"});
               
    }catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function getAllModule(req, res) {
    try {

        let allModule = await LogicpoolModules.find(); //This will find all available modules

        if(allModule.length > 0) return res.status(200).json({allModule , status: "true"});
        else return res.status(404).json({message: 'No Module Available' , status: "false"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
        
    }
}

async function updateModule(req, res) {
    try {

        let incomingNewCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        

        let updatedModule = await LogicpoolModules.findByIdAndUpdate(
            { _id : req.params.id },

            {
                courseName: incomingNewCourseName,
                moduleName: incomingModuleName
            },

            {new: true}
        );

        console.log(updatedModule);
        res.status(200).json({updatedModule , status: true , message: 'Module Updated Successfully'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function deleteModule(req , res) {
    try {
        await LogicpoolModules.deleteOne({ _id : req.params.id});
        console.log(`Module _id: ${req.params.id} is now deleted from the database`);
        res.status(200).json({message: `Module _id: ${req.params.id} is now deleted from the database`});        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}


/////// For Module Topics

async function addTopic(req, res) {
    try {

        let incomingCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        let incomingTopicName = req.body.topicName;
        
        const module = await LogicpoolModules.find({moduleName: incomingModuleName});

        if(module.length > 0) {

            const newTopic = new LogicpoolModuleTopics({
                courseName: incomingCourseName,
                moduleName: incomingModuleName,
                topicName: incomingTopicName
            });
    
            await newTopic.save();
            console.log(`New Topic Added in ${incomingModuleName} Module`);
            res.status(201).json({message: `New Topic Named ${incomingTopicName} is now Added in ${incomingModuleName} Module` , status: "true"});

        } else {
            res.status(404).json({message: `${incomingModuleName} Module Is Not Found` , status: "false"});
        }
             
        

    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error.message});
    }
}

async function getTopic(req, res) {

    try {
        
        let incomingModuleName = req.body.moduleName;
        
        let module = await LogicpoolModuleTopics.find({moduleName: incomingModuleName});
        
        if(module.length > 0) return res.status(200).json({module , status: "true"});
        else return res.status(404).json({message: 'No Topics Available as Module Not Found' , status: "false"});
               
    }catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function getAllTopic(req, res) {

    try {
                
        let allTopics = await LogicpoolModuleTopics.find();
        
        if(allTopics.length > 0) return res.status(200).json({allTopics , status: "true"});
        else return res.status(404).json({message: 'No Topics Available in Database for any course' , status: "false"});
               
    }catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function updateTopic(req, res) {
    try {

        let incomingCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        let incomingTopicName = req.body.topicName;
        

        let updatedTopic = await LogicpoolModuleTopics.findByIdAndUpdate(
            { _id : req.params.id },

            {
                courseName: incomingCourseName,
                moduleName: incomingModuleName,
                topicName: incomingTopicName
            },

            {new: true}
        );

        console.log(updatedTopic);
        res.status(200).json({updatedTopic , status: true , message: 'Topic Updated Successfully'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function deleteTopic(req, res) {
    try {
        await LogicpoolModuleTopics.deleteOne({ _id : req.params.id});
        console.log(`Module-Topic _id: ${req.params.id} is now deleted from the database`);
        res.status(200).json({message: `Module-Topic _id: ${req.params.id} is now deleted from the database`});        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

//For Batches

async function addBatch(req, res) {
    try {
        let incomingBatchName = req.body.name;
        let incomingCourseName = req.body.course;
        let incomingStartingDateOfBatch = req.body.startDate;
        let incomingEndingDateOfBatch = req.body.endDate;

        const newBatch = new LogicpoolBatches({
            name: incomingBatchName,
            course: incomingCourseName,
            startDate: incomingStartingDateOfBatch,
            endDate: incomingEndingDateOfBatch
        });

        await newBatch.save();
        console.log('New Batch Added');
        res.status(201).json({message: `New Batch Created Successfully For ${incomingCourseName} Course` , status: "true"});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: err.message});
    }
}

async function getAllBatch(req, res) {
    try {

        let allAvailableBatches = await LogicpoolBatches.find(); //This will return all available batches of all course

        if(allAvailableBatches.length > 0) return res.status(200).json({allAvailableBatches , status: "true"});
        else return res.status(404).json({message: 'No Batches Available in the Database' , status: "false"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
        
    }
}

async function getBatch(req, res) { //This method will return batches available for a particular course
    try {

        let incomingCourseName = req.body.course;

        let batches = await LogicpoolBatches.find({course: incomingCourseName}); //This will return all available batches for the required course

        if(batches.length > 0) return res.status(200).json({batches , status: "true"});
        else return res.status(404).json({message: `No Batches Available for the ${incomingCourseName} course in the Database`  , status: "false"});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
        
    }
}

async function updateBatch(req, res) {
    try {

        let incomingBatchName = req.body.name;
        let incomingCourseName = req.body.course;
        let incomingStartingDateOfBatch = req.body.startDate;
        let incomingEndingDateOfBatch = req.body.endDate;
        

        let updatedBatch = await LogicpoolBatches.findByIdAndUpdate(
            { _id : req.params.id },

            {
                name: incomingBatchName,
                course: incomingCourseName,
                startDate: incomingStartingDateOfBatch,
                endDate: incomingEndingDateOfBatch
            },

            {new: true}
        );

        console.log(updatedBatch);
        res.status(200).json({updatedBatch , status: true , message: 'Batch Updated Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}

async function deleteBatch(req, res) {
    try {
        await LogicpoolBatches.deleteOne({ _id : req.params.id});
        console.log(`Batch _id: ${req.params.id} is now deleted from the database`);
        res.status(200).json({message: `Batch _id: ${req.params.id} is now deleted from the database`});        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}








module.exports = {
    //Courses
    addCourse,
    getCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
    
    //Modules
    addModule,
    getModule,
    getAllModule,
    updateModule,
    deleteModule,

    //Module Topics
    addTopic,
    getTopic,
    getAllTopic,
    updateTopic,
    deleteTopic,

    //Batches
    addBatch,
    getBatch,
    getAllBatch,
    updateBatch,
    deleteBatch,

    //Students


    //Trainers






}
