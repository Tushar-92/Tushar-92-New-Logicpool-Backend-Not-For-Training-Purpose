const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogicpoolStudentsSchema = new Schema ({

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
    required: true,
  },

  batch: {
    type: String ,
    required: true,
  }, 

  course: {
    type: String ,
    required: true,
  },

  // Role_Id: {
  //   type: Number ,
  // }, 

  status: { // active or not
    type: Boolean,
    required: true,
  },
  
});

const LogicpoolStudents = mongoose.model("LogicpoolStudents" , LogicpoolStudentsSchema )
module.exports = LogicpoolStudents;


