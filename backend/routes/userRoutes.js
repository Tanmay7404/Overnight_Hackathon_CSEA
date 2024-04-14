const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userFunctions.js");




userRouter.post("/addNewUser", async (req,res)=>{
    try {
        var user_details = req.body;
        var UC = new UserController();
        
        const username = await UC.addNewUser(user_details);
        
       // console.log(1222)a
       res.send("success")
    } catch (error) {
       // console.error(error);
        res.status(500).send(error.message);
    }
});

userRouter.post("/getUser", async (req,res)=>{
    try {
        var user_details = req.body;
        var UC = new UserController();
        
        const username = await UC.getUser(user_details);
        
       // console.log(1222)a
       res.send("success")
    } catch (error) {
        console.log(23)
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

userRouter.post("/findUser", async (req,res)=>{
    try {
        var user_details = req.body;
        var UC = new UserController();
        
        const assignments = await UC.findUser(user_details);
        
       // console.log(1222)a
       res.send(assignments)
    } catch (error) {
        console.log(23)
        console.log(error.message);
        res.status(500).send(error.message);
    }
});
module.exports = userRouter;
