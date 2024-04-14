import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAssignment.css';
import TextInputs from "../components/createPages/textInputs";
function CreateAssignment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    endTime: '',  // Assume this is the due date as a timestamp
    testInput: '',
    testOutput: '',
    penaltyTime: ''
  });

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [endTime, setEndTime] = useState("");  // Due date as an ISO string or timestamp
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [penaltyTime, setPenaltyTime] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // Handle date conversion to ISO string right away if it's the endTime
//     const newValue = name === 'endTime' ? new Date(value).toISOString() : value;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: newValue
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Name of the assignment cannot be empty');
      
      return;
    }
    console.log( JSON.stringify({
        "title":title,
        "question":question,
        "endtime":endTime,
        "testInput":testInput,
        "testOutput":testOutput,
        "penaltyTime":penaltyTime
      }));
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
        "testInput":testInput,
        "testOutput":testOutput,
        "penaltyTime":penaltyTime
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
    navigate('/assignments');
})
.catch((error) => {
    console.error('Error:', error);
    alert('Error creating assignment');
});

  };

  return (
    <div className="create-assignment-container">
      <h1>Create New Assignment</h1>
      {/* <form onSubmit={handleSubmit}> */}


      <form onSubmit={handleSubmit}>
        <TextInputs name="Name of Assignment" state={title} setState={setTitle} />
        <TextInputs name="Problem Statement" state={question} setState={setQuestion} type="textarea" />
        <TextInputs name="Due Date" state={endTime} setState={setEndTime} type="datetime-local" />
        <TextInputs name="Input Test Cases" state={testInput} setState={setTestInput} />
        <TextInputs name="Output Test Cases" state={testOutput} setState={setTestOutput} />
        <TextInputs name="Penalty for Late Submission" state={penaltyTime} setState={setPenaltyTime} type="number" />
        <button type="submit">Create Assignment</button>
      </form>``






        <label>Name of Assignment</label>
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
  );
}

export default CreateAssignment;
