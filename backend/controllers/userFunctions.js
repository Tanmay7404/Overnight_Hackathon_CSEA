const e = require("express");
const User = require("../models/userModel"); // Assuming your user model is exported as User

class UserController {
    
    async addNewUser(userDetails){
        try {
            console.log("here"+ userDetails.rollNumber+" "+userDetails.role)
console.log(userDetails)
            const existingUser = await User.findOne({
                rollNumber: userDetails.rollNumber,
                role: userDetails.role
            });
            console.log("here2"+ userDetails.rollNumber+" "+userDetails.role)
console.log(existingUser)
            if (existingUser) {
                console.log("error")
                throw new Error("User with the same roll number and role already exists.");
            }   
            const user = new User({
                fullName: userDetails.fullName,
                rollNumber: userDetails.rollNumber,
                email: userDetails.email,
                department: userDetails.department,
                password:userDetails.password,
                role: userDetails.role
            });
    console.log(121)
            console.log(user)

            await user.save();
            console.log("saved success")

            return userDetails.fullName;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async getUser(userDetails){
        try {
            const existingUser = await User.findOne({
                rollNumber: userDetails.rollNumber,
                role: userDetails.role
            });
            if (!existingUser) {
                console.log("error")
                throw new Error("User with such role and roll Number does not exist.");
            }   
            console.log(existingUser)
            if(existingUser.password!==userDetails.password)
            {
                console.log(existingUser.password+" "+userDetails.password)
                throw new Error("Wrong Password");
            }
           
            return existingUser;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
}

module.exports = UserController;