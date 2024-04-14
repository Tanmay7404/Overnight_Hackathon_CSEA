import React from 'react';
import { Select, MenuItem } from '@mui/material';

const Languages = ({name,lang,setLang}) => {
  const handleChange = (event) => {
    setLang(event.target.value);
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
          <p className="text_input" >{name}</p>
      </div>
      
      <Select
        value={lang}
        onChange={handleChange}
        displayEmpty
        className="fullWidth" size="small" sx={style}

      >
        
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="C++">C++</MenuItem>
        <MenuItem value="Dart">Dart</MenuItem>
        <MenuItem value="PHP">PHP</MenuItem>
        <MenuItem value="SQL">SQL</MenuItem>
      </Select>
    </div>
  );
};

export default Languages;