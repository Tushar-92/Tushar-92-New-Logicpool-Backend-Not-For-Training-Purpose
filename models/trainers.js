const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogicpoolTrainersSchema = new Schema ({
    
    firstName: {
        type: String ,
        required: true,
    },
    
    lastName: {
        type: String ,
        required: true,
    },
        
    emailId: {
        type: String ,
        required: true,
        unique: true
    },
    
    contactNumber: {
        type: String ,
        required: true
    },

    Course: {
        type: String ,
    },
    
    Batch: {
        type: String , 
        required: true,
        unique: true,

    },

    Role_Id: {
        type: String,
    },

    // Is_Active: {
    //     type: Boolean,
    //     required: true,
    // }

});


const LogicpoolTrainers = mongoose.model("LogicpoolTrainers" , LogicpoolTrainersSchema )
module.exports = LogicpoolTrainers;