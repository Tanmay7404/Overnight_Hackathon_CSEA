import React from "react";
import TextField from '@mui/material/TextField';

export default function TextInputs ({name,state,setState, fixed}){
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "white"
            }
        },
    }
  
    const fixedstyle = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "transparent"
            }
        },
    }
    return (
        <div className="fillWidthDiv4">
            <div className="E-mail" >
                <p className="text_input" >{name}</p>
            </div>
            
            <TextField fullWidth  className="fullWidth" size="small" sx={fixed?fixedstyle:style}
                value={state}
                onChange={(event) => {if(!fixed){setState(event.target.value) }}}
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: fixed ? "#131313": '#3B3B3B',
                    // Background color
                    },
                    placeholder:"Type here",
                    readOnly: fixed?true:null
                }} // Change text color
                InputLabelProps={{ style: { color: 'gray' } }} // Change label color
                
            />
            
        </div>
    )
}