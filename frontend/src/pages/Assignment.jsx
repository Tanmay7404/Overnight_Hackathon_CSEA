import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Assignment.css';
import { Button } from '@mui/material';

function Assignment() {
  const navigate = useNavigate();
  const { id } = useParams(); // Directly use this ID
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [pageData, setPageData] = useState({ title: "", creator_roll: "", question: "", startTime: "" });
  const [roll_no, setRollNo] = useState(220101018);
//   const [assignment_id, setAssId] = useState();
  const [role, setRole] = useState(0);

  const [submitted,changeSub] = useState(true);

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
        setPageData(data.ass);
        changeSub(data.submitted);
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

      const data = await response.text();
      console.log(data)
      
    //  setPageData(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error checking assignment'+error);
    }
  };


  const handleUpload = async (event) => {
    event.preventDefault();
    if(!submitted){
      
      if (file) {
        uploadFile(file);
      }
      
    }
    else{
      
      removeSub();
    }
  };

  const removeSub = async () =>{

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

    try {
      const response = await fetch('http://localhost:8080/assignment/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      if(data.url){
      setMessage('Handed In Sucessfully');
    }
    
      setFileName(''); // Clear filename after successful upload
      setFile(null); // Clear file object
      changeSub(true);
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    }
  };







    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setMessage('');
    };
    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate(`/login`); // Changed method call from history.push to navigate
      };
    

      return (
        <div className="upload-container">
            <button className="logout-btn" onClick={handleLogOut}>
                Log Out
            </button>
            <div className="assignment-show">
                <h1>{pageData.title}</h1>
                <div className="question">{pageData.question}</div>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between' }} >
            <h2>File Submission</h2>
            {role==1&&(
<Button variant="contained" color="success" onClick={()=>{checkAssignments()}}>Auto-Grade</Button>)}
</div>
            {role === 0 && (
                <div className="submission">
                    <form onSubmit={handleUpload}>
                        <div className="input-button">
                            <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                            <label htmlFor="file-input" className="btn-attach">Attach File</label>
                        </div>
                        <div className="hand-in-button">
                            {fileName && <span className="file-name">{fileName}</span>}
                            <button type="submit" className="btn-hand-in">{!submitted? "Hand In": "Undo Hand In"}</button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            )}
        {role === 1 && (
    <div id="persons">
        {pageData.submissions?.map((data) => (
            <div >
            <div style={{display:'flex',flexDirection: 'column',height:100}}
                key={data.rollNumber}
                className="person"
                onClick={() =>{} }
            >
            <div >
                {data.rollNumber}
                </div>
                <div >
            <p>Marks :{data.marks}</p>
            
                </div>
            </div>
            
                </div>
        ))}
    </div>
)}


        </div>
    );
}

export default Assignment;
