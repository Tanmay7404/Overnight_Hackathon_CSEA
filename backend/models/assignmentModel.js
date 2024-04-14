const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true ,unique:true},
  question:{ type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime:{ type: Date, default: Date.now },
  penaltyTime:Number,
  language:String,
  testCases:[{input:{type:String},output:{type:String}}],
  submissions: [{
    rollNumber:{type:Number,unique:true},
    name:String,
    file: String,
    marks:Number,
    feedback:String,
    submissionTime:{ type: Date, default: Date.now }
  }
]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports =Assignment;