import React from 'react';
import { Select, MenuItem } from '@mui/material';

const Languages = ({name,lang,setLang}) => {
  const handleChange = (event) => {
    setLang(event.target.value);
  };
  const styles = {
    select: {
      "&:focus": {
        borderColor: "white !important",
      },
    },
    color:"white",
    backgroundColor :"#3B3B3B"
  };
  return (
    <div className="fillWidthDiv4">
      <div className="E-mail" >
          <p className="text_input" >{name}</p>
      </div>
      
      <Select
        value={lang}
        onChange={handleChange}
        displayEmpty
        className="fullWidth" size="small" style={styles}
      >
        
        <MenuItem value="Python" style={{backgroundColor:"#3B3B3B"}}>Python</MenuItem>
        <MenuItem value="C++" style={{backgroundColor:"#3B3B3B"}}>C++</MenuItem>
        <MenuItem value="Dart" style={{backgroundColor:"#3B3B3B"}}>Dart</MenuItem>
        <MenuItem value="PHP" style={{backgroundColor:"#3B3B3B"}}>PHP</MenuItem>
        <MenuItem value="SQL" style={{backgroundColor:"#3B3B3B"}}>SQL</MenuItem>
      </Select>
    </div>
  );
};

export default Languages;