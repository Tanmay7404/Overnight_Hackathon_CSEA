import React from "react";
import Button from 'react-bootstrap/Button';
import './login.css';

// Import your profile image
import TextField from '@mui/material/TextField';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { Box } from "@mui/material";
import  { useState, useEffect, useRef} from 'react';
import  {useParams,useNavigate} from 'react-router-dom'
// import Axios from 'axios';


// import ProfilePicAdd from "../components/createPages/ProfilePic";
import TextInputs from "../components/createPages/textInputs";
// import SelectTags from "../components/createPages/selectTags";
import Starting from "../components/createPages/starting";


export default function Login() {
  const navigate = useNavigate();
  // const {email,fullname} = useParams();
  


  
  const handleSubmit = () => {
    // Assuming you have an API endpoint to send the data
    if(formData.username==='')
    {
      window.alert('username cannot be empty ' );
      return
    }
    console.log(formData)
    fetch('http://localhost:8080/user/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if(response.status==500){
        window.alert('UserName Already Exists. Choose a new one' );
      }
      else{
        navigate("/sucesslogin/"+formData.username)
      }
      
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

    
  const style = {
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
        borderColor: "white"
        }
    },
}
      

  var [username,setUS] = useState("");
  var [department,setDept] = useState("");
  var [email,setEmail] = useState("");
  var [password,setPassword] = useState("");

  const [formData, setFormData] = useState({
    fullname: username,
    email: email,
    department:department,
    password:password,
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  });



  
      // const handleAddSkill = (skill) => {
      //   const newSkills = [...formData.skills, formData.skill];
      //   setFormData({ ...formData, skills: newSkills, skill: "" });
      // };

  return (
  <div class="createPage">
  
    <div class="contentPP" >
      {/* <div className="fillWidthDiv">
        
      </div> */}

      <Starting text="Login"/>
      
      {/* <ProfilePicAdd formData={formData} setFormData={setFormData} /> */}
      
      {/* <div className="fillWidthDiv">

        <TextInputs name="Full Name" state={fullname} fixed={true}/>
    
        <TextInputs name="Email" state={email} fixed={true}/> */}

      {/* </div> */}

   
        <TextInputs name="Email" state={email} setState={setEmail} fixed={false}/>

        <TextInputs name="Password" state={email} setState={setEmail} fixed={false}/>


      {/* <SelectTags text = "Selected Skills" selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> */}
     
      

      {/* <div className="fillWidthDiv4">
        <div className="E-mail">
          <p className="text_input" >Social Links</p>
        </div>
      <div className="name">
        <div className="email1">
        <p style={{color:'white'}}>LinkedIn</p>
      </div>
      <div className="email2">
        <TextField fullWidth id="fullWidth" size="small"  sx={style}
        value={formData.linkedinLink}
        onChange={(event) => setFormData({ ...formData, linkedinLink: event.target.value })}
        InputProps={{
          style: {
            color: 'white', // Text color
            borderColor: 'white', // Border color
            backgroundColor: '#3B3B3B', 
            // Background color
          },
          placeholder:"Type here"
        }} // Change text color
        InputLabelProps={{ style: { color: 'gray' } }} />
      </div>
    </div>
    <div className="space"></div>
    <div className="name">
      <div className="email1">
        <p style={{color:'white'}}>Instagram</p>
      </div>
      <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
      value={formData.instagramLink}
      onChange={(event) => setFormData({ ...formData, instagramLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }} /></div>
</div>
<div className="space">

</div>






</div> */}
<div className="name">
  <div className="buttonContainer" >
    <Button variant="dark" className="buttonHover" style={{width:200,height:30, backgroundColor: 'black'}} onClick={handleSubmit} >
      Done
    </Button>
  </div>
  <div className="buttonContainer" >
    <Button variant="dark" className="buttonHover" style={{width:200,height:30, backgroundColor: 'black'}} onClick={()=>{navigate("/register")}} >
      Register
    </Button>
  </div>
</div>
      
</div>
         
</div>
  );
}