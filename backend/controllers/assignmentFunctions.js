const Assignment = require("../models/assignmentModel"); // Assuming your user model is exported as User
const {fetchTextData,compareStrings} = require ("../functions/fetchTextFromUrl.js");
const Axios = require('axios');

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
const testCaseSize=testCases.length
var newSubmissions=submissions;
                for (const submission of submissions)
                {
                    const file=submission.file
                    const convertedFile=await fetchTextData(file)
                    var a=0.00;
                    for(const testCase of testCases)
                    {

                       
                        const response=await this.checkCode({code:convertedFile,language:language,input:testCase.input,output:testCase.output})
                        console.log(response+" "+testCase.output)
                      if(compareStrings(response,testCase.output))
                      {a++;
                        console.log("correct")
                      }


                    }
                    var marks=(a/testCaseSize)*100;
                    newSubmissions=newSubmissions.filter(msg=>msg.rollNumber!==submission.rollNumber)
var nextSubmission=submission
nextSubmission.marks=marks;
newSubmissions.push(nextSubmission)
                    console.log(marks)
                }
                currAssignment.submissions=newSubmissions
                await currAssignment.save()

                

    
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
              console.log(code+" "+ language+" "+ input)
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

                  const response = await Axios(options);
                  // Return the output if the request was successful
                  
                  return response.data.output;
             
                
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
