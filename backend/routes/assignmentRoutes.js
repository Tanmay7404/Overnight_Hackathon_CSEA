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


assigmentRouter.post("/addNewAssignment", async (req,res)=>{
    try {
        var assignment_details = req.body;
        var AC = new AssignmentController();
        const assignment = await AC.addNewAssignment(assignment_details);

       console.log(1222)
       res.send("success")
    } catch (error) {
       console.error(error);
        res.status(500).send("Internal Server Error");
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
    var roll_no = Number(req.body.roll_no);
    var assn_id = req.body.assn_id;
    try{
        var user =await User.findOne({rollNumber: roll_no,role: 0});
        // var assignment = await Assignment.findById(assn_id);
        submission_details = {
            _id : assn_id,
            details : {
                id:user._id,
                name:user.fullName,
                file:req.file.path,
                marks:null,
                feedback:null
            }

        }
        const submission = await AC.addSubmission(submission_details);
        // assignment.submissions.push({id:user._id,name:user.fullName,file:req.file.path,marks:null,feedback:null});
        // await assignment.save();
        res.send({ url: req.file.path });  // Send the URL of the uploaded file back
    } catch(err){
        res.send(err);
    }
    
    // var data = await fetchTextData(req.file.path);
    // console.log("Save in MongoDB: ", data);
    
    
  });
  
  
  assigmentRouter.get('/download', async (req, res) => {
      const fileUrl = req.query.url; // Assuming URL is passed as a query parameter
    
      const response = await fetch(fileUrl);
      if (response.ok) {
        res.setHeader('Content-Disposition', 'attachment; filename="download.txt"');
        response.body.pipe(res);
      } else {
        res.status(500).send('Error downloading the file');
      }
  });

module.exports = assigmentRouter;
