// import React from 'react'
// import './tag.css'
// import Eachtag from '../NavBar/eachtag';

// function Tag({ onTagClick, tagList,offsets}) {
//     // console.log(selectedSearch);
    
//     const all_tags = [
//       {name: "Programming Language",color: "#68B67E" ,tags: ['Java','Python','JavaScript','C#','PHP','Ruby','C++','Swift','Kotlin','Typescript']},
//       {name: "Web Development",color: "#B77269" ,tags: ['React','Angular','Vue.js','Node.js','Django','Flask','Bootstrap','Wordpress','HTML5','CSS3']},
//       {name: "App Development",color: "#6569B6" ,tags: ['IOS dev','Android dev','React Native','Flutter']},
//       {name: "Database Technologies",color: "#9375C4" ,tags: ['Mysql','Postregresql','MongoDB','SQL Server','Firebase']},
//       {name: "DevOps Cloud Computing",color: "#A5A760" ,tags: ['AWS','Azure','Google Cloud','Docker']},
//       {name: "Machine Learning/AI",color: "#68B5A2" ,tags: ['TensorFlow','Pytorch','Keras','Scikit-Learn','NLP','Computer Vision']},
//       {name: "CyberSecurity",color: "#B44C4C" ,tags: ['Ethical Hacking','Cryptography','Network Security']},
//       {name: "Design And UI/UX",color: "#A950B7" ,tags: ['Figma','Adobe XD','Sketch','UX','UI']},
//       {name: "Miscellaneous",color: "#A1BB55" ,tags: ['Blockchain','IoT','AR','VR']}
//     ]

//   return (
//     <div id='taglist' style={offsets}>
//     {
//       all_tags.map((element)=>{
//         return (
//         <div className="box" key = {element.name} >
//           <div className="title">{element.name}</div>
//           <div className="content">
//             {
//               element.tags.map((ele)=>{
//                 return(
//                   <Eachtag skill={ele} selectedList={tagList} color={element.color} changeTagList={() => onTagClick({tagname: ele, color:element.color})}/>
//                 );
//               })
//             }
//           </div>
//         </div>
//         )
//       })
//     }
//   </div>
//   )
// }

// export default Tag
