import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Assignment.css';
import { Button } from '@mui/material';
import { IoDownload, IoArrowDown, IoArrowUp } from 'react-icons/io5';
import TextInputs from "../components/createPages/textInputs";

function Assignment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [pageData, setPageData] = useState({ title: "", creator_roll: "", question: "", startTime: "", submissions: [], feedback: "" });
  const [roll_no, setRollNo] = useState(220101018);
  const [marks, setMarks] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [aifeedback, aisetFeedback] = useState("");

  const [selectedRoll, setSelectedRoll] = useState();
  const [role, setRole] = useState(0);

  const [submitted, changeSub] = useState(true);
  const [currFeedback, setCurrFeedback] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (!parsedUser || !parsedUser.rollNumber) {
      navigate("/login");
      return;
    }
    console.log(parsedUser);
    setRole(Number(parsedUser.role));
    setRollNo(Number(parsedUser.rollNumber));
    console.log(role);
    console.log(roll_no);

    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/assignment/getAssignments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "roll_no": parsedUser.rollNumber,
            "assn_id": id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assignment details');
        }

        const data = await response.json();
        console.log(data)
        setPageData(data.ass);
        changeSub(data.submitted);

        if (data.ass && data.ass.submissions) {
          const submission = data.ass.submissions.find(sub => Number(sub.rollNumber) === Number(parsedUser.rollNumber));
          if (submission) {
            console.log("Marks for the submission:", submission.marks);
            setMarks(submission.marks);
          } else {
            console.log("No submission found for this roll number.");
            setFeedback(null);
            setMarks(null); // or handle this scenario appropriately
          }
        }

        if (data.ass && data.ass.submissions) {
          const submission = data.ass.submissions.find(sub => Number(sub.rollNumber) === Number(parsedUser.rollNumber));
          if (submission) {
            console.log("Instructor's feedback", submission.feedback);
            setFeedback(submission.feedback);
            aisetFeedback(submission.aiFeedback)
          } else {
            console.log("No submission found for this roll number.");
            setFeedback(null);
            setMarks(null); // or handle this scenario appropriately
          }
        }

      } catch (error) {
        console.error('Error:', error);
        alert('Error Fetching assignment');
      }
    };

    fetchAssignment();
  }, [id, navigate]);

  const checkAssignments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/assignment/checkAssignments/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check assignments');
      }

      const data = await response.json();

      setPageData(prevData => ({
        ...prevData,
        submissions: data.submissions
      }));
      console.log(12)
      console.log(data)
      console.log(12)
      alert("Auto Grading Completed")

    } catch (error) {
      console.error('Error:', error);
      alert('Error checking assignment' + error);
    }
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch(`http://localhost:8080/assignment/submitFeedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "rollNumber": selectedRoll,
          "feedback": currFeedback,
          "_id": id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.text();
      console.log(data)

    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting Feedback' + error);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!submitted) {
      if (file) {
        uploadFile(file);
      }
    } else {
      removeSub();
    }
  };

  const removeSub = async () => {
    try {
      const response = await fetch(`http://localhost:8080/assignment/removeSub`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "roll_no": roll_no,
          "assn_id": id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assignment details');
      }
      setMessage("Your Submission is removed")
      changeSub(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Removing Submission');
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("roll_no", roll_no);
    formData.append("assn_id", id);
    formData.append('fileName', file.name);

    try {
      const response = await fetch('http://localhost:8080/assignment/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data + ' Upload failed');
      }
      if (data.url) {
        setMessage('Handed In Successfully');
      }

      setFileName(''); // Clear filename after successful upload
      setFile(null); // Clear file object
      changeSub(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setMessage('');
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate(`/login`);
  };

  const handleBack = () => {
    navigate(`/AssignmentList`);
  };

  return (
    <div className="upload-container">
      <div className="header">
        <button className="logout-btn" onClick={handleBack}>
          Back
        </button>
        <h1>{pageData.title}</h1>
        <button className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <div className="assignment-show">
        <div className="question">{pageData.question}</div>
      </div>
      <h2>File Submission</h2>
      {role == 1 && (
        <Button variant="contained" color="success" onClick={checkAssignments} style={{ marginBottom: '20px' }}>
          Auto-Grade
        </Button>
      )}
      {role === 0 && (
        <div className="submission">
          <form onSubmit={handleUpload}>
            <div className="sub-buts">
              <div className="input-button">
                <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                <label htmlFor="file-input" className="btn-attach">Attach File</label>
              </div>
              <div className="hand-in-button">
                {fileName && <span className="file-name">{fileName}</span>}
                <button type="submit" className="btn-hand-in">{!submitted ? "Hand In" : "Undo Hand In"}</button>
              </div>
            </div>
          </form>
          <div className="marks-col">
            {!submitted ? "Not Submitted" : (marks === null) ? "Not Graded" : `${marks}/100`}
          </div>
          <div className="feedback-block">
            {(marks === null) ? "No Feedback Yet" : `Instructor's Feedback: ${feedback}`}
          </div>
          {message && <p>{message}</p>}
          <div style={{ width: '100%' }}>
            <TextInputs variant={"outlined"} name="AI Feedback" state={aifeedback} tp={"multi"} fixed={"true"} />
          </div>
        </div>
      )}
      {role === 1 && (
        <div>
          {pageData.submissions?.map((submission, index) => (
            <div key={index} className="student-box">
              <div className="info-box">
                <span className="student-roll">Roll No. {submission.rollNumber}</span>
                <span className="student-roll">Marks {submission.marks}/100</span>
                <a href={submission.url} download>
                  <IoDownload className="download-icon" />
                </a>
                <button onClick={() => {
                  setSelectedRoll(submission.rollNumber);
                  setCurrFeedback(submission.feedback);
                }} className="feedback-button">
                  Feedback {selectedRoll === submission.rollNumber ? <IoArrowUp /> : <IoArrowDown />}
                </button>
              </div>
              {selectedRoll === submission.rollNumber && (
                <div className="feedback-box">
                  <textarea
                    value={currFeedback}
                    onChange={(e) => setCurrFeedback(e.target.value)}
                    placeholder="Enter feedback"
                    className="feedback-textarea"
                  />
                  <button onClick={submitFeedback} className="submit-feedback-btn">Submit Feedback</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Assignment;
