import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './CreateAssignment.css';
import Links from '../components/createPages/links';
import TextInputs from "../components/createPages/textInputs";
import Starting from '../components/createPages/starting';
import Languages from '../components/createPages/languages';
function CreateAssignment() {
  const navigate = useNavigate();
  

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [endTime, setEndTime] = useState("");  // Due date as an ISO string or timestamp
  // const [testInput, setTestInput] = useState("");
  // const [testOutput, setTestOutput] = useState("");
  const [penaltyTime, setPenaltyTime] = useState("");
  const [values, setValues] = useState([{ name: '', link: '' }]);
  const [values2, setValues2] = useState([{ name: '', link: '' }]);

  const [lang,setLang] = useState("Python");

  const [roll_no, setRollNo] = useState(0);

  useEffect(() => {
    
      const user = localStorage.getItem('user');
      
      const parsedUser = JSON.parse(user);
      
      if (!parsedUser || !parsedUser.rollNumber) {
        navigate("/login");
        return;
      }
      console.log(parsedUser);
      
      setRollNo(Number(parsedUser.rollNumber));
      
      // console.log(roll_no);
         
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
//     // Handle date conversion to ISO string right away if it's the endTime
    const newValue = name === 'endTime' ? new Date(value).toISOString() : value;
    // const timePart = value.split('T')[1];
    // state = {endTime};
    console.log(newValue);
    setEndTime(newValue);
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: newValue
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roll_no);
    if (!title) {
      alert('Name of the assignment cannot be empty');
      
      return;
    }
    // console.log( JSON.stringify({
    //     "title":title,
    //     "question":question,
    //     "endtime":endTime,
    //     "testInput":testInput,
    //     "testOutput":testOutput,
    //     "penaltyTime":penaltyTime,
    //     "users": values2
    //   }));
    // API call to add a new assignment
    const resp =  await fetch('http://localhost:8080/assignment/addNewAssignment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "title":title,
        "question":question,
        "endtime":endTime,
        // "testInput":testInput,
        // "testOutput":testOutput,
        "language": lang,
        "testCases" : values,
        "penaltyTime":penaltyTime,
        "users": values2,
        "roll_no": roll_no
      })
    
})
.then(response => {
    if (!response.ok) {
        // Extract text instead of JSON to handle non-JSON responses
        return response.text().then(text => {
            throw new Error(text || 'Error submitting form');
        });
    }
    console.log(response);
    return response;
})
.then(data => {
    console.log('Success:', data);
    navigate('/AssignmentList');
})
.catch((error) => {
    console.error('Error:', error);
    alert('Error creating assignment');
});

  };

  return (
    <div class="createPage">
  
      <div class="contentPP">
    
        <Starting text="Create Assignment" path="/AssignmentList"/>


        
        <TextInputs name="Name of Assignment" state={title} setState={setTitle} />
        <TextInputs name="Problem Statement" state={question} setState={setQuestion} type="textarea" />
        <div className="fillWidthDiv4">
            <div className="E-mail" >
                <p className="text_input" >Select End Date</p>
            </div>
            <input type="datetime-local" name="endTime" onChange={handleInputChange} required />
        </div>
        {/* <TextInputs name="Due Date" state={endTime} setState={setEndTime} type="datetime-local" /> */}

        <Languages name="Select Submission Languages" setLang={setLang} lang={lang} />
        <Links name = "Test Cases" p1="Input Case" p2="Output Case" values2={values} setValues2={setValues}/>
        <TextInputs name="Penalty for Late Submission" state={penaltyTime} setState={setPenaltyTime} />
        <Links name = "Students" p1="Roll_No Range Start" p2="Roll_no Range End" values2={values2} setValues2={setValues2}/>

        <div className="name">
          <div className="buttonContainer" >

            <Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} onClick={handleSubmit} >
              Create Project
            </Button>
          </div>
        </div>
        {/* <label>Name of Assignment</label> */}
{/* 
        <input type="text" name="title" placeholder="Name of Assignment" onChange={handleInputChange} required />
        <label>Problem Statement</label>
        <textarea name="question" placeholder="Problem Statement" onChange={handleInputChange} required></textarea>
        <label>Due Date</label>
        <input type="datetime-local" name="endTime" onChange={handleInputChange} required />
        <label>Input Test Cases</label>
        <input type="text" name="testInput" placeholder="Test Input" onChange={handleInputChange} required />
        <label>Output Test Cases</label>
        <input type="text" name="testOutput" placeholder="Test Output" onChange={handleInputChange} required />
        <label>Penalty for Late Submission</label>
        <input type="number" name="penaltyTime" placeholder="Penalty for Late Submission" onChange={handleInputChange} required />
        <button type="submit">Create Assignment</button>
      </form> */}
      </div>

    </div>

  );
}

export default CreateAssignment;
