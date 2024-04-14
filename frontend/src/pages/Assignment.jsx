import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './Assignment.css';

function Assignment( ) {
    var roll_no = 220101018;
    var assignment_id = "661ba02932adf14f9e70e66d";
    var role=0;
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
const [pageData,setPageData]=useState({title:"",creator_roll:"",question:"",startTime:""})
  useEffect(()=>{
    const fetchAssignment =async()=>{
        console.log("fetching assignment")
    const response = await fetch('http://localhost:8080/assignment/getAssignments/'+assignment_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      });
var data=await response.json()
setPageData(data)
console.log(data)
  }
  fetchAssignment()
}

  
  ,[])
  const handleUpload = async (event) => {
    event.preventDefault();
    if (file) {
      uploadFile(file);
    }
  };


  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("roll_no",roll_no);
    formData.append("assn_id",assignment_id);
    try{
        const response = await fetch('http://localhost:8080/assignment/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log("Done: ",data.url);
        // setUrl(`http://localhost:3000/download?url=${encodeURIComponent(data.url)}`);
        // setFN(file.name);
        setMessage('File uploaded successfully: ' + data.url);
        setFileName(''); // Clear filename after successful upload
        setFile(null); // Clear file object
    } catch (error) {
        setMessage('Upload failed: ' + error.message);
    }
    return;
  };






    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setMessage('');
    };

    

    return (
        <div className="upload-container">
            <div className="assignment-show">
                <h1>               { pageData.title}
</h1>
                <div className="question">
               { pageData.question}

                </div>
            </div>
            <h2>File Submission</h2>
            <div className="submission">
            
            
            
            <form onSubmit={handleUpload}>
                <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                <label htmlFor="file-input" className="btn-attach">Attach File</label>
                {fileName && <span className="file-name">{fileName}</span>}
                <button type="submit" className="btn-hand-in">Hand In</button>
            </form>

            {message && <p>{message}</p>}
        </div>
        </div>
    );
}

export default Assignment;
