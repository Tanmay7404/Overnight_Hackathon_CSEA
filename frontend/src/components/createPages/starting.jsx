import React from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from 'react-icons/io5'; 

export default function Starting({text}){
    return(
        <div className="fillWidthDiv2">
            <h3 className="heading"  ><b>{text}</b></h3>
            <Button style={{backgroundColor:"transparent",borderColor:"transparent"}} className="close-icon">
                <IoCloseOutline size={32} style={{ color: 'white' }}/> 
            </Button>
        </div>
    );
}