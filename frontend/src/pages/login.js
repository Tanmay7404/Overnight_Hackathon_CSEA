import React from "react";
import Button from 'react-bootstrap/Button';
import './login.css';
import Form from 'react-bootstrap/Form';

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
  


  
  const handleSubmit = async() => {
    // Assuming you have an API endpoint to send the data
    if(rollNumber==='')
    {
      window.alert('username cannot be empty ' );
      return
    }
    // console.log(formData)
   await fetch('http://localhost:8080/user/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "rollNumber":rollNumber,
        "password":password,
        "role":role
      })
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem("user",JSON.stringify({rollNumber,role}));
            navigate("/AssignmentList/");
        } else {
          return response.text().then(data => {
            throw new Error(data); // Throw an error with the error message from the response body
          });
        }
      })

    .catch((error) => {
      console.log('Error:'+ error);
window.alert(error.message)
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
const handleRadioChange = (e) => {
    setRole(e);
  };

  var [username,setUS] = useState("");
  var [department,setDept] = useState("");
  var [email,setEmail] = useState("");
  var [password,setPassword] = useState("");
  var [role,setRole] = useState(0);
  var [rollNumber,setRollNumber] = useState("");

  // const [formData, setFormData] = useState({
  //   fullname: username,
  //   email: email,
  //   department:department,
  //   password:password,
  //   // profilePictureUrl: "",
  //   // profilePictureFilename: "",
  //   // skills: [],
  //   // projects: [],
  //   // coursesCompleted: []
  // });



  
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

   
        <TextInputs name="Roll Number" state={rollNumber} setState={setRollNumber} fixed={false}/>

        <TextInputs name="Password"  state={password} setState={setPassword} fixed={false}/>
     
      

<div className="Email">
        <Form.Check
          type="radio"
          label="Student"
          id="radio-option1"
          value="option12"
          checked={role === 0} // Set the checked state based on selectedOption
          onChange={()=>{handleRadioChange(0)}} // Handle radio button change
        />
        <Form.Check
          type="radio"
          label="Instructor"
          id="radio-option2"
          value="option22"
          checked={role===1} // Set the checked state based on selectedOption
          onChange={()=>{handleRadioChange(1)}} // Handle radio button change
        />
    </div>
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