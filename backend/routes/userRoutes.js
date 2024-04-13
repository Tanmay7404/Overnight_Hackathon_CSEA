const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userFunctions.js");




userRouter.post("/addNewUser", async (req,res)=>{
    try {
        var user_details = req.body;
        var UC = new UserController();
        const username = await UC.addNewUser(user_details);

       // console.log(1222)
       res.send("success")
    } catch (error) {
       // console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = userRouter;
