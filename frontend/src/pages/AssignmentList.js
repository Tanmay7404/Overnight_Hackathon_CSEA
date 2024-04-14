import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentCard from '../components/createPages/AssignmentCard';
import './AssignmentList.css';

function AssignmentList() {
  const [assignments,setAssignments] = useState([
    // { id: 1, name: 'Assignment 1', dueDate: '2023-04-14', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    // { id: 2, name: 'Assignment 2', dueDate: '2023-04-20', description: 'Suspendisse sodales nunc ut enim fringilla rutrum.' },
    // { id: 3, name: 'Assignment 3', dueDate: '2023-04-25', description: 'Curabitur quis sollicitudin tortor.' },
  ]);
  const [roll_no, setRollNo] = useState("");
  const [role, setRole] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const navigate = useNavigate(); 
  
    useEffect(() => {
      async function fetchData() {
        const user = localStorage.getItem('user');
        // Make sure to parse the user if it's a JSON string
        const parsedUser = JSON.parse(user);
        
        if (!parsedUser || !parsedUser.rollNumber) {
          navigate("/login");
          return;
        }
  
        try {
          console.log(parsedUser);
          const response = await fetch('http://localhost:8080/user/findUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "roll_no": parsedUser.rollNumber,
                "role" : parsedUser.role
            })
          });
  
          if (!response.ok) {
            // Handle non-OK responses by throwing an error
            const errorText = await response.text();
            throw new Error(errorText || 'Error fetching data');
          }
          // console.log(response.json())
          const data = await response.json();
          setAssignments(data);
          console.log(data)
          //  Navigate based on success if needed
        } catch (error) {
          console.error('Error:', error);
          alert('Error Fetching assignment');
        }
      }
  
      fetchData();
    }, [navigate]);



  
    





  






// Changed from useHistory to useNavigate

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };


  const handleCreateNewAssignment = () => {
    navigate(`/create-assignment/${roll_no}`); // Changed method call from history.push to navigate
  };

  
  

  return (
    <div>
      <h1 className="assignment-head">Assignments</h1>
      {role === 1 && (
        <button className="create-assignment-btn" onClick={handleCreateNewAssignment}>
          Create New Assignment
        </button>
      )}
      <div className="assignments-container">
        {assignments.map(assignment => (
          <AssignmentCard key={assignment.id} assignment={assignment} onClick={handleAssignmentClick} />
        ))}
      </div>
    </div>
  );
}

export default AssignmentList;
