#  Assignment Autograder Portal

This project was made as a solution of the problem statement of Overnight Hackathon by CSEA, IITG.
One can find the problem statement here "https://docs.google.com/document/d/1m3tXjAMXfRqQen6L5AQMoQHU6u9LngLdoI4mkrSq6Ic/edit#heading=h.6jynaot9cbnq"

## About

The CS Assignment Autograder Portal is a comprehensive platform designed to streamline the assignment submission, plagiarism detection, and grading process for Computer Science students and instructors at IIT Guwahati. This project aims to alleviate the challenges faced by both students and teaching assistants by providing a centralized and automated system for managing assignments.

Features
**Submission Management:** 
Easy and secure file uploads in various formats. 
Handles multiple file submissions for each assignment, provided they are made before the assignments end

**Plagiarism Detection:**
remove all the comments and whitespaces from the code, normalises the variables and then check the codes of all the submissions for similarity and detects plag. (Baker's Dup Algorithm)

**Auto-grading:**
Instructor can provide Test Cases Api will be called to run the code on an online compiller and the student is graded accordingly

**Feedback and Review:** 
Provides a clear and organized interface for instructors to review submissions and leave comments
Students can access detailed feedback from auto-grading and instructor reviews

**User Experience (UX)**
Intuitive Interface: Easy to navigate for both students and instructors with minimal training required

## Known Issues
Currently, there are no known issues.

## Future Updates
Improve Design and UX of the site.
Integration with additional plagiarism detection tools like CodeQery, JPlag.
Find Better API for compillers with no limit on number of API calls.
Improved accessibility features for users with disabilities.

## Dependencies
nodeJs, React, Mongoose,
"axios","connect-mongo","cors","dotenv","express","express-session","fs","googleapis","lodash","method-override","mongodb","mongoose","multer","multer-storage-cloudinary","node-fetch","nodemon"

## How to Run 
1) Clone the repo on your device
2) In the terminal type the following commands to run backend
   ```
   cd backend
   npm i
   npm start
   ```
4) In another terminal run the frontend
   ```
   cd frontend
   npm i
   npm start
   ```
## Screenshots

Login Page
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/1ea47dcc-2884-452c-bdc4-f2949013e209)

Register Page
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/6fac0d0a-4144-4cc0-a1cc-89a65e3ea050)

Assignment List
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/9a08c727-2915-47a9-9b09-64cf1f72500d)

Create Assignment
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/44a32373-8302-469a-bf03-2aa1db59adf2)

Seeing Submissions
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/434eda81-6271-4b73-a78e-5ccf22a2136e)

Submitting File
![image](https://github.com/Tanmay7404/Overnight_Hackathon_CSEA/assets/118533285/0e16e9c6-4344-4545-9d40-3588199dfb99)



Impact
Potential Benefit: Streamlines assignment submissions, plagiarism detection, and grading processes
Feasibility ofg Implementation: Realistic to implement within the institute's infrastructure and resources
Demo Video


GitHub Repository
