import React, { useState } from 'react';
import axios from 'axios';
import './Assignment.css';

function Assignment() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please attach a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('File uploaded successfully: ' + response.data.message);
            setFileName(''); // Clear filename after successful upload
            setFile(null); // Clear file object
        } catch (error) {
            setMessage('Upload failed: ' + error.message);
        }
    };

    return (
        <div className="upload-container">
            <div className="assignment-show">
                <h1>Assignment name</h1>
                <div className="question">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales nunc ut enim fringilla rutrum. Morbi ut suscipit arcu. Vestibulum suscipit ipsum ac libero finibus, ut consequat est convallis. Quisque posuere non nunc a pretium. Nulla molestie ipsum est, gravida accumsan velit luctus ut. Curabitur quis sollicitudin tortor. Nunc lacinia justo ac eros aliquet porta. Integer tincidunt ipsum id ligula varius, non vulputate nisl blandit. Integer nec molestie dui. Integer eget scelerisque quam. Praesent urna dui, venenatis nec facilisis quis, mollis convallis dolor. In tristique eros vitae elit mollis rhoncus. Morbi neque mauris, aliquet facilisis faucibus nec, dictum sit amet mauris. Aenean aliquam consequat ante at tincidunt. Donec eget sapien quam. Duis sed tortor non odio condimentum cursus.            
Pellentesque eros enim, faucibus quis leo vitae, congue malesuada neque. Aenean in erat vel tellus posuere rhoncus. Suspendisse potenti. Aenean accumsan condimentum cursus. Etiam eu dapibus justo. Maecenas eget placerat felis, a lobortis velit. Fusce sapien ipsum, sodales quis dolor nec, mattis sollicitudin lectus. Duis quis ligula vestibulum, sagittis eros vitae, faucibus turpis. Cras sit amet lectus quis dui lacinia rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in congue dui. Proin id pellentesque ex. Morbi lectus nisi, bibendum ac tincidunt et, convallis id nibh. In rutrum posuere urna. Nunc arcu justo, accumsan nec hendrerit nec, pretium eu urna. Mauris eget nulla ut risus dictum lacinia in eu nunc.

Curabitur ultrices erat id nulla mollis, blandit maximus nulla dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet felis feugiat, tincidunt elit sit amet, sagittis sem. Aliquam erat volutpat. Morbi hendrerit turpis nec nibh efficitur, id rhoncus dui facilisis. Aliquam auctor magna eu elit tincidunt, in venenatis elit tristique. Donec tincidunt leo nibh, nec iaculis nulla viverra ac.

Cras ornare pharetra arcu at congue. Morbi eleifend euismod nibh sed euismod. Sed ut sem sit amet tortor consectetur consequat. Vivamus nec lobortis est. Mauris euismod faucibus laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ultricies ante non odio iaculis egestas. Suspendisse potenti. Curabitur odio nisi, euismod sit amet viverra nec, euismod ac turpis. Maecenas iaculis semper augue feugiat ultricies. Nulla et aliquam massa, eu elementum sem.`}</div>
                
            </div>
            <h2>File Submission</h2>
            <div className="submission">
            <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="file-input" className="btn-attach">Attach File</label>
            {fileName && <span className="file-name">{fileName}</span>}
            <button onClick={handleUpload} className="btn-hand-in">Hand In</button>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
}

export default Assignment;
