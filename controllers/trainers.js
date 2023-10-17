
const LogicpoolTrainers = require('../models/trainers');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

async function trainerRegistration(req, res) {
    try {

        let incomingFirst_Name =  req.body.First_Name;
        let incomingLast_Name =  req.body.Last_Name;
        let incomingEmail_Id =  req.body.Email_Id;
        let incomingContact_Number = req.body.Contact_Number;
        let incomingModule_ID = req.body.Module_ID;
        let incomingPassword =  req.body.Password;
        
        const saltrounds = 10;

        // bcrypt.hash(incomingPassword, saltrounds, async(error , hash) => {
            
        //     console.log(error);
            
        //     const newTrainer = new LogicpoolTrainers({
        //         First_Name : incomingFirst_Name,
        //         Last_Name: incomingLast_Name,
        //         Email_Id: incomingEmail_Id,
        //         Contact_Number: incomingContact_Number,
        //         Module_ID: incomingModule_ID,
        //         Password: hash
        //     });

        //     await newTrainer.save();
        //     console.log('Trainer Created');
        //     res.status(201).json({message: 'Successfully Created New Trainer Record'});
        
        // })
        
        const newTrainer = new LogicpoolTrainers({
            First_Name : incomingFirst_Name,
            Last_Name: incomingLast_Name,
            Email_Id: incomingEmail_Id,
            Contact_Number: incomingContact_Number,
            Module_ID: incomingModule_ID,
            Password: incomingPassword
        });
    
        await newTrainer.save();
        console.log('Trainer Created');
        res.status(201).json({message: 'Successfully Created New Trainer Record'});        

    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error.message});
    }
}


async function trainerLogin(req, res) {

    try {
        
        let incomingEmail_Id =  req.body.Email_Id;
        let incomingPassword =  req.body.Password;
        
        let trainer = await LogicpoolTrainers.find({Email_Id: incomingEmail_Id});
        
        // if(trainer.length > 0) {

            // bcrypt.compare(incomingPassword , trainer[0].Password , (err, result) => {
            //     if(err) {
            //         throw new Error('Something went wrong');
            //     }
                
            //     if(result === true) {
            //         console.log(trainer[0].id); // Just for self analysis
            //         console.log(trainer[0]._id); // Just for self analysis
            //         return res.status(200).json({message: 'Trainer logged in successfully'}); //Here only we have to generate jwt token i.e token: generateAccessToken(user[0].id, user[0].Name , user[0].ispremiumuser)}

            //     } else {
            //         return res.status(401).json({message: 'Password is Incorrect'});
            //     }
            // })
            
            // } else {
            //     return res.status(404).json({message: 'Trainer Does Not Exists'});
            // }

            res.status(200).json(trainer);
    
        }catch (err) {
        console.log(err);
        res.status(500).json({message: `${err.message}`});
    }

}


module.exports = {
    trainerRegistration,
    trainerLogin
}
