const express = require("express");
const assigmentRouter = express.Router();
const AssignmentController = require("../controllers/assignmentFunctions.js");




assigmentRouter.post("/addNewAssignment", async (req,res)=>{
    try {
        var assignment_details = req.body;
        var AC = new AssignmentController();
        const assignment = await AC.addNewAssignment(assignment_details);

       // console.log(1222)
       res.send("success")
    } catch (error) {
       // console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

assigmentRouter.post("/addSubmission", async (req,res)=>{
    try {
        var submission_details = req.body;
        var AC = new AssignmentController();
        const submission = await AC.addSubmission(submission_details);

       // console.log(1222)
       res.send("success")
    } catch (error) {
       // console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


assigmentRouter.get("/getAssignments/:assignmentId", async (req,res)=>{
    try {
        var assignmentId = req.params.assignmentId;

        var AC = new AssignmentController();

        const assignment = await AC.getAssignments(assignmentId);

       // console.log(1222)
       res.send("success")
    } catch (error) {
       // console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = assigmentRouter;
