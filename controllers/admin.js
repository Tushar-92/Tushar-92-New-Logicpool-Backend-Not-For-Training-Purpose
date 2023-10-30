
const LogicpoolCourses = require('../models/courses');
const LogicpoolModules = require('../models/modules');
const LogicpoolModuleTopics = require('../models/moduleTopics');
const LogicpoolBatches = require('../models/batches');
const LogicpoolStudents = require('../models/students');
const LogicpoolUsers = require('../models/users');
const LogicpoolTrainers = require('../models/trainers');
const LogicpoolBatches_Module_Trainer = require('../models/batch_trainer_module');
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

///////For Batches

async function addBatch(req, res) {
    try {
        let incomingBatchName = req.body.batchName;
        let incomingCourseName = req.body.courseName;
        let incomingStartingDateOfBatch = req.body.startDate;
        let incomingEndingDateOfBatch = req.body.endDate;

        const newBatch = new LogicpoolBatches({
            batchName: incomingBatchName,
            courseName: incomingCourseName,
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

        let incomingCourseName = req.body.courseName;

        let batches = await LogicpoolBatches.find({courseName: incomingCourseName}); //This will return all available batches for the required course

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

///////For Students

async function addStudent(req, res) {
    
    try {
        let incomingFirstName = req.body.firstName;
        let incomingLastName = req.body.lastName;
        let incomingEmailId = req.body.emailId;
        let incomingContactNumber = req.body.contactNumber;
        let incomingBatchName = req.body.batchName;
        let incomingCourseName = req.body.courseName;
        let incomingStatus = req.body.status;


        // if(incomingStatus==="Active") incomingStatus = true;
        // else incomingStatus = false;



        const newUserDetails = new LogicpoolUsers({
            emailId: incomingEmailId,
            password: incomingFirstName,
            Role: 'Student',
            status: incomingStatus
        });

        let newUser = await newUserDetails.save();
        // console.log(newUser);
        // console.log((newUser._id).valueOf());
        let userIdOfnewUser = (newUser._id).valueOf();



        const newStudentDetails = new LogicpoolStudents({
            firstName: incomingFirstName,
            lastName: incomingLastName,
            emailId: incomingEmailId,
            contactNumber: incomingContactNumber,
            batchName: incomingBatchName,
            courseName: incomingCourseName,
            status: incomingStatus,
            userID: userIdOfnewUser            
        });

        await newStudentDetails.save();
        


        console.log("New Student Record Created");
        res.status(201).json({message: "New Student Record Created" , status: true});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: err.message});
        
    }

}

async function getAllStudent(req, res) {

    try {
        let allStudentRecords = await LogicpoolStudents.find();

        if(allStudentRecords.length > 0) return res.status(200).json({allStudentRecords , status: true});
        else return res.status(404).json({message: 'No Student Record Found in the Database' , status: false});    
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`}); 
    }
}

async function updateStudent(req, res){
    try {

        let incomingFirstName = req.body.firstName;
        let incomingLastName = req.body.lastName;
        let incomingEmailId = req.body.emailId;
        let incomingContactNumber = req.body.contactNumber;
        let incomingBatchName = req.body.batchName;
        let incomingCourseName = req.body.courseName;
        let incomingStatus = req.body.status;
        let incomingUserObjectIdForUserTable = req.body.userId;

        // if(incomingStatus==="Active") incomingStatus = true;
        // else incomingStatus = false;

        
        let updatedStudent = await LogicpoolStudents.findByIdAndUpdate(
            { _id : req.params.id },

            {
                firstName: incomingFirstName,
                lastName: incomingLastName,
                emailId: incomingEmailId,
                contactNumber: incomingContactNumber,
                batchName: incomingBatchName,
                courseName: incomingCourseName,
                status: incomingStatus
            },

            {new: true}
        );

        
        let updatedUser = await LogicpoolUsers.findByIdAndUpdate(
            { _id : incomingUserObjectIdForUserTable },

            {
                emailId: incomingEmailId,
                password: incomingFirstName,
                Role: 'Student',
                status: incomingStatus
            },

            {new: true}
        );

        console.log("Student Record Updated Successfully")
        res.status(200).json({updatedStudent, updatedUser,status: true , message: 'Student Record Updated Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}

async function deleteStudent(req, res){
    try {
        
        let studentDetails = await LogicpoolStudents.find({_id: req.params.id});
        
        if(studentDetails.length > 0) {
            
            let incomingUserObjectIdForUserTable = (studentDetails[0].userID);
            console.log("Extracted userID is = " + studentDetails[0].userID);

            await LogicpoolUsers.deleteOne({_id: incomingUserObjectIdForUserTable});
            await LogicpoolStudents.deleteOne({_id: req.params.id});
            res.status(200).json({ message: `Student_Id: ${req.params.id} is now deleted from the database`});
        }else{
            res.status(404).json({ message: `Student_Id: ${req.params.id} not found`});
        }

        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}


///////For Trainers
async function addTrainer(req, res) {
    
    try {
        let incomingFirstName = req.body.firstName;
        let incomingLastName = req.body.lastName;
        let incomingEmailId = req.body.emailId;
        let incomingContactNumber = req.body.contactNumber;
        let incomingStatus = req.body.status;


        // if(incomingStatus==="Active") incomingStatus = true;
        // else incomingStatus = false;



        const newUserDetails = new LogicpoolUsers({
            emailId: incomingEmailId,
            password: incomingFirstName,
            Role: 'Trainer',
            status: incomingStatus
        });

        let newUser = await newUserDetails.save();
        // console.log(newUser);
        // console.log((newUser._id).valueOf());
        let userIdOfnewUser = (newUser._id).valueOf();



        const newTrainerDetails = new LogicpoolTrainers({
            firstName: incomingFirstName,
            lastName: incomingLastName,
            emailId: incomingEmailId,
            contactNumber: incomingContactNumber,
            status: incomingStatus,
            userID: userIdOfnewUser            
        });

        await newTrainerDetails.save();
        

        console.log("New Trainer Record Created");
        res.status(201).json({message: "New Trainer Record Created" , status: true});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({Message: err.message});
        
    }

}

async function getAllTrainer(req, res) {

    try {
        let allTrainerRecords = await LogicpoolTrainers.find();

        if(allTrainerRecords.length > 0) return res.status(200).json({allTrainerRecords , status: true});
        else return res.status(404).json({message: 'No Trainer Record Found in the Database' , status: false});    
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`}); 
    }
}

async function updateTrainer(req, res){
    try {

        let incomingFirstName = req.body.firstName;
        let incomingLastName = req.body.lastName;
        let incomingEmailId = req.body.emailId;
        let incomingContactNumber = req.body.contactNumber;
        let incomingStatus = req.body.status;
        let incomingUserObjectIdForUserTable = req.body.userId;

        // if(incomingStatus==="Active") incomingStatus = true;
        // else incomingStatus = false;

        
        let updatedTrainer = await LogicpoolTrainers.findByIdAndUpdate(
            { _id : req.params.id },

            {
                firstName: incomingFirstName,
                lastName: incomingLastName,
                emailId: incomingEmailId,
                contactNumber: incomingContactNumber,
                status: incomingStatus
            },

            {new: true}
        );

        
        let updatedUser = await LogicpoolUsers.findByIdAndUpdate(
            { _id : incomingUserObjectIdForUserTable },

            {
                emailId: incomingEmailId,
                password: incomingFirstName,
                Role: 'Trainer',
                status: incomingStatus
            },

            {new: true}
        );

        console.log("Trainer Record Updated Successfully")
        res.status(200).json({updatedTrainer, updatedUser,status: true , message: 'Trainer Record Updated Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}

async function deleteTrainer(req, res){
    try {
        
        let trainerDetails = await LogicpoolTrainers.find({_id: req.params.id});
        
        if(trainerDetails.length > 0) {
            
            let incomingUserObjectIdForUserTable = (trainerDetails[0].userID);
            console.log("Extracted userID is = " + trainerDetails[0].userID);

            await LogicpoolUsers.deleteOne({_id: incomingUserObjectIdForUserTable});
            await LogicpoolTrainers.deleteOne({_id: req.params.id});
            res.status(200).json({ message: `Trainer_Id: ${req.params.id} is now deleted from the database`});
        }else{
            res.status(404).json({ message: `Trainer_Id: ${req.params.id} not found`});
        }

        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}


///////For Batch-Trainer-Module

async function addBatchTrainerModue(req, res) {
    try {

        let incomingBatchName = req.body.batchName;
        let incomingCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        let incomingTrainersFullName = req.body.trainerFullName;
        let incomingStartingDateOfBatch = req.body.startDate;
        let incomingEndingDateOfBatch = req.body.endDate;
        

                
        const newDetails = new LogicpoolBatches_Module_Trainer({
            batchName: incomingBatchName,
            courseName: incomingCourseName,
            moduleName: incomingModuleName,
            trainerFullName: incomingTrainersFullName,
            startDate: incomingStartingDateOfBatch,
            endDate: incomingEndingDateOfBatch
        });
    
        await newDetails.save();
        console.log(`New Details For Batch-Trainer-Module is now Added`);
        res.status(201).json({message: "New Details For Batch-Trainer-Module is now Added", status: true});
      
             
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error.message});
    }
}


async function getAllBatchTrainerModule(req, res) {
    try {

        let details = await LogicpoolBatches_Module_Trainer.find(); //This will return all

        if(details.length > 0) return res.status(200).json({details , status: true});
        else return res.status(404).json({message: 'No Details of Batch-Trainer-Module Available in the Database' , status: false});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
        
    }
}


async function updateBatchTrainerModule(req, res) {
    try {

        let incomingBatchName = req.body.batchName;
        let incomingCourseName = req.body.courseName;
        let incomingModuleName = req.body.moduleName;
        let incomingTrainersFullName = req.body.trainerFullName;
        let incomingStartingDateOfBatch = req.body.startDate;
        let incomingEndingDateOfBatch = req.body.endDate;
        

        let updatedDetails = await LogicpoolBatches_Module_Trainer.findByIdAndUpdate(
            { _id : req.params.id },

            {
                batchName: incomingBatchName,
                courseName: incomingCourseName,
                moduleName: incomingModuleName,
                trainerFullName: incomingTrainersFullName,
                startDate: incomingStartingDateOfBatch,
                endDate: incomingEndingDateOfBatch
            },

            {new: true}
        );

        // console.log(updatedDetails);
        res.status(200).json({updatedDetails , status: true , message: 'Batch-Trainer-Module Updated Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }
}


async function deleteBatchTrainerModule(req, res) {
    try {
        await LogicpoolBatches_Module_Trainer.deleteOne({ _id : req.params.id});
        console.log(`Batch-Trainer-Module _id: ${req.params.id} is now deleted from the database`);
        res.status(200).json({message: `Batch-Trainer-Module _id: ${req.params.id} is now deleted from the database`});        
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
    addStudent,
    getAllStudent,
    updateStudent,
    deleteStudent,

    //Trainers
    addTrainer,
    getAllTrainer,
    updateTrainer,
    deleteTrainer,

    //Batch-Trainer-Module
    addBatchTrainerModue,
    getAllBatchTrainerModule,
    updateBatchTrainerModule,
    deleteBatchTrainerModule


}
