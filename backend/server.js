//IMPORT MODULES

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const _ = require('lodash');
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyD_-BM_UUFlX7Zr3aZ3thWH5YkhjDS2R8w");



const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());



const server = http.createServer(app);


async function initialize() {
    try {
        const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/Overnight_Hackathon?retryWrites=true&w=majority";
        mongoose.connect(url).then(() => console.log("Database Connected Successfully")).catch(err => console.log("Database not connected",err));        


 
       
    } catch (error) {
        console.error("Database connection error:", error);
    }
}




app.post('/generate',async(req,res)=>{
    const {prompt}=req.body;
    try{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const result=await model.generateContent(prompt);
const response=await result.response;
const text=response.text();



res.send(text)
    }catch(error){
        res.send("Failed to generate content")
    }
})



//ROUTES IMPORT
const userRoutes = require("./routes/userRoutes.js");
app.use("/user",userRoutes);

const assignmentRoutes = require("./routes/assignmentRoutes.js");
app.use("/assignment",assignmentRoutes);


//PORT
const port = process.env.port || 8080;

initialize().then(() => {
    // Start the server after the database initialization
  server.listen(port, function () {
  // Example usage


        console.log(`Server Started on Port ${port}`);
    });
}).catch(error => {
    console.error("Initialization error:", error);
});
//LISTENER
// app.listen(port,function(){
//     console.log(`Server Started on Port ${port}`);


// });

// module.exports = {hashlist,room};