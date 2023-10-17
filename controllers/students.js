
const LogicpoolStudents = require('../models/students');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

async function studentRegistration(req, res) {
    try {

        let incomingFirst_Name =  req.body.First_Name;
        let incomingLast_Name =  req.body.Last_Name;
        let incomingEmail_Id =  req.body.Email_Id;
        let incomingContact_Number = req.body.Contact_Number;
        let incomingAddress = req.body.Address;
        let incomingPassword =  req.body.Password;
        
        const saltrounds = 10;

        bcrypt.hash(incomingPassword, saltrounds, async(error , hash) => {
            
            console.log(error);
            
            const newStudent = new LogicpoolStudents({
                First_Name : incomingFirst_Name,
                Last_Name: incomingLast_Name,
                Email_Id: incomingEmail_Id,
                Contact_Number: incomingContact_Number,
                Address: incomingAddress,
                Password: hash
            });

            await newStudent.save();
            console.log('Student Created');
            res.status(201).json({message: 'Successfully Created New Student'});
        
        })

              
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error.message});
    }
}


// async function getStudentDetails(req, res) {
//     try {
//         let requestedId = req.params.id;
//         // console.log(requestedId);
//         let student = await LogicpoolStudents.find({_id: requestedId});
//         res.status(200).json(student);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: 'Student Record Not Found'});
//     }
// }

async function studentLogin(req, res) {

    try {
        
        let incomingEmail_Id =  req.body.Email_Id;
        let incomingPassword =  req.body.Password;
        
        let student = await LogicpoolStudents.find({Email_Id: incomingEmail_Id});
        
        if(student.length > 0) {

            bcrypt.compare(incomingPassword , student[0].Password , (err, result) => {
                if(err) {
                    throw new Error('Something went wrong');
                }
                
                if(result === true) {
                    console.log(student[0].id); // Just for self analysis
                    console.log(student[0]._id); // Just for self analysis
                    return res.status(200).json({message: 'Student logged in successfully'}); //Here only we have to generate jwt token i.e token: generateAccessToken(user[0].id, user[0].Name , user[0].ispremiumuser)}

                } else {
                    return res.status(401).json({message: 'Password is Incorrect'});
                }
            })
            
            } else {
                return res.status(404).json({message: 'Student Does Not Exists'});
            }
    
        } catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}


module.exports = {
    studentRegistration,
    // getStudentDetails,
    studentLogin
}
