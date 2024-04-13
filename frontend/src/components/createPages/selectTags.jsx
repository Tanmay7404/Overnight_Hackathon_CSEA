import React from "react";
import  { useState, useEffect, useRef} from 'react';
import  {useParams,useNavigate} from 'react-router-dom'
import Eachtag from "../NavBar/eachtag";
import Tag from "./tag";
export default function SelectTags({text, selectedTags, setSelectedTags}){
    var [showTag, setShowTag] = useState(false);
    var searchRef = useRef(null);
    var tagRef = useRef(null);
    
    
    var toggleTagSelection = (tag) => {
        if(showTag){
            setSelectedTags((prevTags) => {
            
            // Check if any tag in prevTags has the same tagname as the current tag
            var tagIndex = prevTags.findIndex(t => t.tagname === tag.tagname);
            if (tagIndex !== -1) {
                // Tag already exists, remove it from the list
                return prevTags.filter((_, index) => index !== tagIndex);
            } else {
                // Tag doesn't exist, add it to the list
                return [...prevTags, tag];
            }
            });

        }
    };
    const [secondDivStyles, setSecondDivStyles] = useState({});

    useEffect(() => {
        // Calculate the height of the first div after rendering
        const firstDiv = document.getElementById('contentTags');
        console.log(firstDiv.offsetHeight);
        if (firstDiv) {
            const firstDivTop = firstDiv.offsetTop;
            const firstDivLeft = firstDiv.offsetLeft;
            const firstDivWidth = firstDiv.offsetWidth;
            const firstDivHeight = firstDiv.offsetHeight;

            // Set the styles for the second div based on the position and dimensions of the first div
            setSecondDivStyles({
                top: firstDivTop + firstDivHeight,
                left: firstDivLeft,
                width: firstDivWidth
            });
        }
    }, [selectedTags]);


    useEffect(() => {
        
        var handleClickOutside = (event) => {
        // Check if the click is outside of searchRef and tagRef
        if (searchRef.current && !searchRef.current.contains(event.target) && 
            tagRef.current && !tagRef.current.contains(event.target)) {
            setShowTag(false);
        }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef, tagRef]);

    return (
        <div className="fillWidthDiv4">
            <div className="E-mail" >
                <p className="text_input">Skills</p>
            </div>

            
            
            {/* <TextField  fullWidth id="fullWidth" size="small"  sx={style}
            InputProps={{
                style: { 
                color: 'white', // Text color
                backgroundColor: '#3B3B3B', 
                },
                placeholder:"Search Tags"
            }} // Change text color
            InputLabelProps={{ style: { color: 'gray' }}} // Change label color
            /> */}
            
            <div className="box1" key = "Search" ref={searchRef} onClick={() => setShowTag(true)}>
                <div className="title">{text}</div>
                <div className="content1" id = "contentTags">
                    {
                    selectedTags.map((ele)=>{
                        return(
                        <Eachtag skill={ele.tagname} selectedList={selectedTags} color={ele.color} changeTagList={()=>toggleTagSelection(ele)} />
                        );
                    })
                    }
                </div>
            </div>
            <div  id ="skillsAdd" ref={tagRef}>
                {showTag ? <Tag onTagClick = {toggleTagSelection} tagList={selectedTags} offsets={secondDivStyles}/>: null }
                
            </div>
        </div>
       
        
    )
}