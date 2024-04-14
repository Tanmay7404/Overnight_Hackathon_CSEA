const e = require("express");
const User = require("../models/userModel"); // Assuming your user model is exported as User
const Assignment = require("../models/assignmentModel");

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
    async findUser(userDetails) {
        try {
            console.log("Finding User: ", userDetails);
            if(userDetails.role === 0){

            
                const existingUser = await User.findOne({
                    rollNumber: userDetails.roll_no,
                    role: userDetails.role
                });
        
                if (!existingUser) {
                    console.log("Error: User with such role and roll Number does not exist.");
                    throw new Error("User with such role and roll Number does not exist.");
                }
                
                console.log(existingUser);
            
                console.log('hi');  

                
                const assignments = await Promise.all(existingUser.assignments.map(async (ass_id) => {
                    const ass = await Assignment.findById(ass_id);
                    return { id: ass._id, name: ass.title, dueDate: ass.endTime };
                }));
    
                console.log(assignments);
                return assignments;
            }
            else{
                var assns = await Assignment.find({creator_roll:userDetails.roll_no});
                
                var assignments = assns.map((ass)=>{
                    console.log(ass);
                    console.log('are you?');
                    return {id: ass._id, name: ass.title, dueDate: ass.endTime};
                })
                console.log(assignments);
                return assignments;
            }
        
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    
}

module.exports = UserController;