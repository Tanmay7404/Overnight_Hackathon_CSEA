const Assignment = require("../models/assignmentModel"); // Assuming your user model is exported as User

class AssigmentController {
        async addNewAssignment(assignment) {
            try {
                const newAssignment = new Assignment({
                    title: assignment.title,
                    question: assignment.question,
                    startTime: assignment.startTime,
                    endTime: assignment.endTime,
                    penaltyTime: assignment.penaltyTime,
                    submissions: [] // Initialize submissions as an empty array
                });
    
                await newAssignment.save();
    
                return newAssignment._id;
            } catch (err) {
                throw new Error(err);
            }
        }
        async addSubmission(assignment) {
            try {

               const id=assignment._id
               var currAssignment = await Assignment.findById(id);
               if (!currAssignment) {
                throw new Error("Project not found");
            }
            currAssignment.submissions.push(assignment.details)
                await currAssignment.save();
    
                return currAssignment._id;
            } catch (err) {
                throw new Error(err);
            }
        }
        async getAssignments(id) {
            try {

               
               var currAssignment = await Assignment.findById(id);
               if (!currAssignment) {
                throw new Error("Assignment not found");
            }
                
    
                return currAssignment;
            } catch (err) {
                throw new Error(err);
            }
        }


    
    }

    module.exports = AssigmentController;
