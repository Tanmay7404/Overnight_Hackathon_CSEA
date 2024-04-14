const Assignment = require("../models/assignmentModel"); // Assuming your user model is exported as User
const fetchTextData = require ("../functions/fetchTextFromUrl.js");

class AssigmentController {
        async addNewAssignment(assignment) {
            try {
                const newAssignment = new Assignment({
                    title: assignment.title,
                    question: assignment.question,
                    startTime: assignment.startTime,
                    endTime: assignment.endTime,
                    penaltyTime: assignment.penaltyTime,
                    language:assignment.language,
                    testCases:assignment.testCases,
                    submissions: [] // Initialize submissions as an empty array
                });
    
                await newAssignment.save();
    
                return newAssignment._id;
            } catch (err) {
                throw new Error(err);
            }
        }
        async checkAssignments(assignment_id) {
            try {
                const currAssignment=await Assignment.findById(assignment_id)
                const submissions=currAssignment.submissions
                 const testCases=currAssignment.testCases
                 const language=currAssignment.language

                for (const submission of submissions)
                {
                    const file=submission.file
                    const convertedFile=fetchTextData(file)
                    for(const testCase of testCases)
                    {
                       const response=await this.checkCode({code:convertedFile,language:language,input:testCase.input,output:testCase.output})
                       console.log(response)
                    }
                }

    
                //await newAssignment.save();
    
                return currAssignment;
            } catch (err) {
                throw new Error(err);
            }
        }
        async checkCode(details) {
            try {
                let code = details.code; 
                let language = details.language; 
                let input = details.input; 
              
                if (language === "python") { 
                    language = "python3"
                } 
              
                let data3 = { 
                    language: language, 
                    version: 'latest',
                    code: code, 
                    input: input,
                }; 
                const options = {
                    method: 'POST',
                    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
                    headers: {
                      'content-type': 'application/json',
                      'X-RapidAPI-Key': 'ad8530c212msh65c2725baaea14ep122618jsn181f4d03edbc',
                      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
                    },
                    data : data3
                  };

               await Axios(options) 
                 .then((response) => { 
                    console.log(response.data) 

                       return response.data
                    }).catch((error) => { 
                        console.log(error); 

                        return error.message
                    }); 

             
                
                return ;
            } catch (err) {
                throw new Error(err);
            }
        }

        async addSubmission(submission,assignment_id) {
            try {

               const id=submission._id
               var currAssignment = await Assignment.findById(assignment_id);
               if (!currAssignment) {
                throw new Error("Assignment not found");
            }
            currAssignment.submissions.push(submission)
                await currAssignment.save();
    
                return currAssignment._id;
            } catch (err) {
                throw new Error(err);
            }
        }
        async getAssignments(id) {
            try {

               
            
                
    
                return currAssignment;
            } catch (err) {
                throw new Error(err);
            }
        }

        async checkSubmission(id) {
            try {

               
               var currAssignment = await Assignment.findById(id);
               if (!currAssignment) {
                throw new Error("Assignment not found");
            }
                
    
                return currAssignment;
            } catch (err) {
                throw new Error(err);
            }
        }


    
    }

    module.exports = AssigmentController;
