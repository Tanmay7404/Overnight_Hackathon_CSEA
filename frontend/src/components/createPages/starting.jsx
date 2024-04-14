import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5'; 

export default function Starting({text,path}){
    const navigate = useNavigate();
    return(
        <div className="fillWidthDiv2">
            <h3 className="heading"  ><b>{text}</b></h3>
            <Button style={{backgroundColor:"transparent",borderColor:"transparent"}} className="close-icon" onClick={()=>navigate(path)}>
                <IoCloseOutline size={32} style={{ color: 'white' }}/> 
            </Button>
        </div>
    );
}