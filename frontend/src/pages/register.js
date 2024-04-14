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


export default function Register() {
  const navigate = useNavigate();
  // const {email,fullname} = useParams();
  

  const [formData, setFormData] = useState({
    fullname: username,
    email: email,
    department:department,
    password:password,
    rollNumber:rollNumber,
    role:role
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  });
// useEffect(()=>{

// },[username,email,rollNumber,password,department])
  const handleRadioChange = (e) => {
    setRole(e);
  };
  const handleSubmit = async() => {
    // Assuming you have an API endpoint to send the data
    if(formData.username==='')
    {
      window.alert('username cannot be empty ' );
      return
    }
    if(formData.rollNumber==='')
    {
      window.alert('rollNumber cannot be empty ' );
      return
    }
   const resp=await fetch('http://localhost:8080/user/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({   "fullName": username,
        "email": email,
        "department":department,
        "password":password,
        "rollNumber":rollNumber,
        "role":role})
    })
    .then(response => {
      if (response.ok) {
        localStorage.setItem("user",{rollNumber,role})
        navigate("/AssignmentList/");
    } else {
        return response.text().then(data => {
          throw new Error(data); // Throw an error with the error message from the response body
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
window.alert(error.message)
      // Handle error
    });
  };

    

      

  var [username,setUS] = useState("");
  var [department,setDept] = useState("");
  var [email,setEmail] = useState("");
  var [password,setPassword] = useState("");
  var [rollNumber,setRollNumber] = useState("");
  var [role,setRole] = useState(0);





  
      // const handleAddSkill = (skill) => {
      //   const newSkills = [...formData.skills, formData.skill];
      //   setFormData({ ...formData, skills: newSkills, skill: "" });
      // };

  return (
  <div class="createPage">
  
    <div class="contentPP" >
      {/* <div className="fillWidthDiv">
        
      </div> */}

      <Starting text="Register"/>
      
      {/* <ProfilePicAdd formData={formData} setFormData={setFormData} /> */}
      
      {/* <div className="fillWidthDiv">

        <TextInputs name="Full Name" state={fullname} fixed={true}/>
    
        <TextInputs name="Email" state={email} fixed={true}/> */}

      {/* </div> */}
      <TextInputs name="Full Name" state={username} setState={setUS} fixed={false}/>
      <TextInputs name="Password" state={password} setState={setPassword} fixed={false}/>

      <div className="fillWidthDiv">
      <TextInputs name="Roll Number" state={rollNumber} setState={setRollNumber} fixed={false}/>

        <TextInputs name="Department" state={department} setState={setDept} fixed={false}/>
        </div>

      <TextInputs name="Email" state={email} setState={setEmail} fixed={false}/>
<div className="Email">
        <Form.Check
          type="radio"
          label="Student"
          id="radio-option1"
          value="option1"
          checked={role === 0} // Set the checked state based on selectedOption
          onChange={()=>{handleRadioChange(0)}} // Handle radio button change
        />
        <Form.Check
          type="radio"
          label="Instructor"
          id="radio-option2"
          value="option2"
          checked={role===1} // Set the checked state based on selectedOption
          onChange={()=>{handleRadioChange(1)}} // Handle radio button change
        />
    </div>
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
    <Button variant="dark" className="buttonHover" style={{width:200,height:30, backgroundColor: 'black'}} onClick={()=>{handleSubmit()}} >
      Done
    </Button>
  </div>
  <div className="buttonContainer" >
    <Button variant="dark" className="buttonHover" style={{width:200,height:30, backgroundColor: 'black'}} onClick={()=>{navigate("/login")}} >
      Login
    </Button>
  </div>
</div>

</div>
         
</div>
  );
}