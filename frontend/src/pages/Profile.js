import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import placeholderProfilePic from '../assets/360_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.webp'; // Adjust the path as needed

function Profile() {
  const [roll_no, setRollNo] = useState(0);
  const [role, setRole] = useState(0);
  const [fullName, setFN] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(user);
    if (!parsedUser || !parsedUser.rollNumber) {
      navigate('/login');
      return;
    }

    setRole(Number(parsedUser.role));
    setRollNo(Number(parsedUser.rollNumber));

    async function fetchUserData() {
      try {
        const response = await fetch('http://localhost:8080/user/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roll_no: parsedUser.rollNumber,
            role: parsedUser.role,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setFN(data.user_details.fullName);
        setDept(data.user_details.department);
        setEmail(data.user_details.email);
        const storedProfilePic = localStorage.getItem('profilePic');
        if (storedProfilePic) {
          setProfilePic(storedProfilePic); // Set profile picture from local storage
        } else {
          setProfilePic(data.user_details.profilePic);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error Fetching user data');
      }
    }

    fetchUserData();
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profilePic'); // Remove profile pic on logout
    navigate(`/login`);
  };

  const handleBack = () => {
    navigate(`/AssignmentList`);
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    // You can perform additional checks on the file type, size, etc.
    const profilePicUrl = URL.createObjectURL(file);
    setProfilePic(profilePicUrl);
    localStorage.setItem('profilePic', profilePicUrl); // Save profile picture to local storage
  };

  const handleRemoveProfilePic = () => {
    setProfilePic(null);
    localStorage.removeItem('profilePic');
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button className="logout-btn" onClick={handleBack}>
          Back
        </button>
        <h1>User Profile</h1>
        <button className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <div className="profile-details">
        <div className="profile-pic">
          <label
            htmlFor="profile-upload"
            className={`profile-upload-label ${profilePic ? 'transparent' : ''}`}
          >
            {profilePic ? (
              <div className="profile-pic-wrapper">
                <img src={profilePic} alt="Profile" className="profile-img" />
                <button className="remove-pic-btn" onClick={handleRemoveProfilePic}>
                  Remove Picture
                </button>
              </div>
            ) : (
              <div className="profile-pic-wrapper">
                <img src={placeholderProfilePic} alt="Profile" className="profile-img" />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                />
                <span>Upload Picture</span>
              </div>
            )}
          </label>
        </div>
        <p>
          <strong>Roll No:</strong> {roll_no}
        </p>
        <p>
          <strong>Full Name:</strong> {fullName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Department:</strong> {dept}
        </p>
        <p>
          <strong>Role:</strong> {role === 0 ? 'Student' : 'Instructor'}
        </p>
      </div>
    </div>
  );
}

export default Profile;
