import React from "react";
import { useState } from "react";
// import TextField from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';


export default function Links ({values2,setValues2}){
    
    const addTextField2 = () => {
        console.log(values2);
        setValues2([...values2, { name: '', link: '' }]); // Append a new object with name and link properties
        console.log(values2);
    };
    const handleClear2=(index)=>{
        const newValues2 = values2.filter((_, indexes) => indexes !== index);   
        setValues2(newValues2);
    };
    const handleChange2 = (index, field, value) => {
        const newValues = [...values2];
        newValues[index][field] = value;
        setValues2(newValues);
    };
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "white"
            }
        },
    }
    return (

    
    <div className="fillWidthDiv4">
        <div className="E-mail" >
            <p style={{color:"white",margin:'0'}} >Add Students</p>
        </div>

        {values2.map((value, index) => (
            <div key={index} className="fillWidthDiv">
            <TextField fullWidth  className="fullWidth" size="small" sx={style}
                value={value.name} // Use value.name for the name field
                onChange={(e) => handleChange2(index, 'name', e.target.value)} // Pass 'name' as the field parameter
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: '#3B3B3B',
                    // Background color
                    },
                    placeholder:"Start Roll_no"
                }} // Change text color
                InputLabelProps={{ style: { color: 'gray' } }} // Change label color
            />
            <TextField fullWidth  className="fullWidth" size="small" sx={style}
                value={value.link} // Use value.link for the link field
                onChange={(e) => handleChange2(index, 'link', e.target.value)} // Pass 'link' as the field parameter
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: '#3B3B3B',
                    // Background color
                    },
                    placeholder:"End Roll_No",
                    endAdornment: (
                        <IconButton onClick={()=>handleClear2(index) } size="small" sx={{visibility:(index)?"visible":"hidden"}}>
                        <ClearIcon  />
                        </IconButton>
                    ),
                }} // Change text color
                InputLabelProps={{ style: { color: 'gray' } }} // Change label color
                
        
            />
            </div>
        ))}
        
        <div className="E-mail" >

            <Button onClick={addTextField2}className="box" variant="dark" style={{  height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2 >+</h2>
            </Button>
            <p style={{color:"white",marginLeft:10}} className="editProfile">Add more Links</p>
        </div>
    </div>
    );
}