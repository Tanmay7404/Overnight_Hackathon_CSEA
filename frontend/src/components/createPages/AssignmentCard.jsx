import React from 'react';

function AssignmentCard({ assignment, onClick }) {
  return (
    <div className="assignment-card" onClick={() => onClick(assignment)}>
      <h3>{assignment.name}</h3>
      <p>Due: {assignment.dueDate}</p>
    </div>
  );
}

export default AssignmentCard;
