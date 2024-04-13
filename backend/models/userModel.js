const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName:{ type: String, required: true },
  rollNumber:{type:Number,unique:true},
  email: { type: String, required: true ,unique:true},
  profileInfo: {
    bio: String,
    profilePicture: {url :String, filename: String}
    },
  department:{type: String},
  type:Number,
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],  // this chat is renundant 
});

const User = mongoose.model('User', userSchema);

module.exports = User;