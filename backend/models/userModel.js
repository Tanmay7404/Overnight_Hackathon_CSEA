const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName:{ type: String, required: true },
  rollNumber:{type:Number},
  email: { type: String, required: true },
  password:String,
  // profileInfo: {
  //   profilePicture: {url :String, filename: String}
  //   },
  department:{type: String},
  role:Number,
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],  // this chat is renundant 
});
userSchema.index({rollNumber:1,role:1},{unique:true})

const User = mongoose.model('User', userSchema);

module.exports = User;