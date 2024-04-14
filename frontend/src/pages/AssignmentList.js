import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentCard from '../components/createPages/AssignmentCard';
import './AssignmentList.css';

function AssignmentList() {
  const [assignments] = useState([
    { id: 1, name: 'Assignment 1', dueDate: '2023-04-14', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, name: 'Assignment 2', dueDate: '2023-04-20', description: 'Suspendisse sodales nunc ut enim fringilla rutrum.' },
    { id: 3, name: 'Assignment 3', dueDate: '2023-04-25', description: 'Curabitur quis sollicitudin tortor.' },
  ]);
  var role = 1;
  var roll_no = 220101018;
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const navigate = useNavigate(); // Changed from useHistory to useNavigate

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
