const express = require("express");
const assigmentRouter = express.Router();
const AssignmentController = require("../controllers/assignmentFunctions.js");
const fetchTextData = require ("../functions/fetchTextFromUrl.js");
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fetch = require('node-fetch');
const User = require ("../models/userModel.js");
const Assignment = require("../models/assignmentModel.js");
const UserController = require("../controllers/userFunctions.js");


assigmentRouter.post("/addNewAssignment", async (req,res)=>{
    try {
        var assignment_details = req.body;
        var AC = new AssignmentController();
        const assignment = await AC.addNewAssignment(assignment_details);

       console.log(1222)
       res.send("success")
    } catch (error) {
       console.error(error);
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
assigmentRouter.post("/addSubmission", async (req,res)=>{
  try {
      var submission_details = req.body;
      var AC = new AssignmentController();
      const assignment = await AC.addSubmission(submission_details.details,submission_details.assignment_id);

     // console.log(1222)
     res.send("success")
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});
// assigmentRouter.post("/addSubmission", async (req,res)=>{
//     try {
//         var submission_details = req.body;
//         var AC = new AssignmentController();
//         const submission = await AC.addSubmission(submission_details);

//        // console.log(1222)
//        res.send("success")
//     } catch (error) {
//        // console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });


assigmentRouter.post("/getAssignments", async (req,res)=>{
    try {
        var assignmentId = req.body.assn_id;
        var roll_no = req.body.roll_no;

        var AC = new AssignmentController();

        const assignment = await AC.getAssignments(assignmentId,roll_no);

       // console.log(1222)
       res.send(assignment)
    } catch (error) {
       // console.error(error);
       res.status(500).send(JSON.stringify(error.message));
    }
});

assigmentRouter.post("/submitFeedback", async (req,res)=>{
  try {
      var feedback = req.body.feedback;
      var roll_no = req.body.rollNumber;
      var _id=req.body._id
      var AC = new AssignmentController();

      const assignment = await AC.submitFeedback(feedback,roll_no,_id);

     // console.log(1222)
     res.send(assignment)
  } catch (error) {
     // console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

assigmentRouter.post("/removeSub", async (req,res)=>{
  try {
      var assignmentId = req.body.assn_id;
      var roll_no = req.body.roll_no;

      var AC = new AssignmentController();

      await AC.removeSub(assignmentId,roll_no);

    //  console.log(1222)
     res.send("done");
  } catch (error) {
     // console.error(error);
     res.status(500).send(JSON.stringify(error.message));
  }
});

assigmentRouter.get("/checkAssignments/:assignmentId", async (req,res)=>{
  try {
    var assignmentId = req.params.assignmentId;

    var AC = new AssignmentController();

    const assignment = await AC.checkAssignments(assignmentId);

   // console.log(1222)
   res.send("success")
} catch (error) {
   // console.error(error);
   res.status(500).send(JSON.stringify(error.message));
}
  //getting the required data from the request 

    }
  
  )
  
  // Assume fetchTextData is called with a URL retrieved from MongoDB
  
  
  cloudinary.config({
    cloud_name: "dcsdkvzcq",
    api_key: "618752832712719",
    api_secret: "rgX_HlO6GJ8GNBrtHwALAZr2DAw"
  });
  
  
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'UserFiles',
      resource_type: 'raw'  // Important for non-image files
    },
  });
  
  const parser = multer({ storage: storage });
  
  assigmentRouter.post('/upload', parser.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    var roll_no = (req.body.roll_no);
    var assn_id = req.body.assn_id;
    try{
        var user =await User.findOne({rollNumber: roll_no,role: 0});
        console.log(req.file.path)
        if(!user)
        {
          res.send("no user found")
        }
        console.log(req.body.fileName)
        // var assignment = await Assignment.findById(assn_id);
       var submission_details = {
            _id : assn_id,
            details : {
                rollNumber:roll_no,
                name:user.fullName,
                file:req.file.path,
                fileName:req.body.fileName,
                marks:null,
                feedback:null
            }

        }
        console.log(user)
        console.log(submission_details)
        var AC = new AssignmentController();

        const submission = await AC.addSubmission(submission_details.details,submission_details._id);
        // assignment.submissions.push({id:user._id,name:user.fullName,file:req.file.path,marks:null,feedback:null});
        // await assignment.save();
        res.send({ url: req.file.path });  // Send the URL of the uploaded file back
    } catch(err){
      console.log(err)
        res.status(500).send(JSON.stringify(err.message));
    }
    
    // var data = await fetchTextData(req.file.path);
    // console.log("Save in MongoDB: "z, data);
    
    
  });
  
  
  assigmentRouter.get('/download', async (req, res) => {
      const fileUrl = req.query.url; // Assuming URL is passed as a query parameter
      var fileName=req.query.fileName
      console.log(req.query)
      console.log(fileName)
      if(fileName==="undefined")
      {
        fileName=req.query.rollNumber+".txt"
      }
      const response = await fetch(fileUrl);
      if (response.ok) {
        res.setHeader('Content-Disposition', 'attachment; filename="'+fileName+'"');
        response.body.pipe(res);
      } else {
        res.status(500).send('Error downloading the file');
      }
  });

module.exports = assigmentRouter;
