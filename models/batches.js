const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogicpoolBatchesSchema = new Schema ({

  name: {
    type: String ,
    required: true,
    // unique: true //can't be unique otherwise other batches of same name for different courses can't be added.
  },

  course: {
    type: String ,
    required: true
  },

  startDate: {
    type: String,
    required: true,
  },

  endDate: {
    type: String,
    required: true
  }

  
});

const LogicpoolBatches = mongoose.model("LogicpoolBatches" , LogicpoolBatchesSchema)
module.exports = LogicpoolBatches;

