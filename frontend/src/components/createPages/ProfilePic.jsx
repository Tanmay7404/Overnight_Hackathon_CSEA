// import React from 'react';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import uploadImage from '../../functions/uploadImage';
// import deleteImage from '../../functions/deleteImage';



// function ProfilePicAdd({formData, setFormData}) {

//     const triggerFileInput = () => {
//         document.getElementById('fileInput').click();
//     };
//     var [profilepic,setpp] = useState(profileImage);

//     return (
//         <div className="fillWidthDiv3">
//             <div className="imageContainer">
//                 <img src={profilepic} alt="Profile" className="profile-image" />
//             </div>
//             <div className="buttonContainer" >
//                 <input type="file" id="fileInput" name="fileInput" hidden onChange={async (event)=>{
//                     var data = await uploadImage(event.target.files);
//                     console.log(data);
//                     setpp(data.secure_url);
//                     setFormData({
//                       ...formData,
//                       url: data.secure_url,
//                       imageName: data.public_id
//                     });
//                 }} />
                
//                 <Button variant="outline-dark" onClick={triggerFileInput}
//                     className="buttonHover"  style={{height:"100%", width:"100%", backgroundColor: "#111111",justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px'}}  >
//                     <p  className="profile_pic_text"> Upload new Picture </p>
//                 </Button>
                
//             </div>
//             <div className="buttonContainer" >
//                 <Button variant="outline-dark" onClick ={()=>{
//                     deleteImage(formData.imageName);
//                     setpp(profileImage);
//                     setFormData({...formData,url:'',imageName:''}) 
//                 }} className="buttonHover"  style={{height:"100%", width:"100%", backgroundColor: "#111111",justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px'}}  >
//                     <p  className="profile_pic_text"> Remove Picture </p>
//                 </Button>
//             </div>
//         </div>
//     )
// }

// export default ProfilePicAdd;