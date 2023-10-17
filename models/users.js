const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogicpoolUsersSchema = new Schema ({

  emailId: {
    type: String ,
    required: true,
    unique: true
  },

  Role_Id: {
    type: String ,
    required: true,
  },

  password: {
    type: String,
    required: true
  }

});

const LogicpoolUsers = mongoose.model("LogicpoolUsers" , LogicpoolUsersSchema)
module.exports = LogicpoolUsers;


