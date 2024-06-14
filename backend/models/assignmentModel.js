const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true ,unique:true},
  creator_roll : {type:Number},
  question:{ type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime:{ type: Date, default: Date.now },
  penaltyTime:Number,
  language:String,
  testCases:[{input:{type:String},output:{type:String}}],
  submissions: [{
    rollNumber:{type:Number},
    name:String,
    file: String,
    marks:{ type: Number, default: null },
    fileName:String,
    marks:Number,
    feedback:String,
    submissionTime:{ type: Date, default: Date.now },
    aiFeedback:String
  }
]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports =Assignment;