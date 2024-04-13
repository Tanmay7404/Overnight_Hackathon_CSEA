import React from "react";

const ToggleButton = ({text,val,changeVal}) => {

    const changeToggle = () => {
      // Toggle the ongoing value in the formData state
      changeVal(!val);
    };
    
    return (
        <div className="fillWidthDiv5" style={{justifyContent:"flex-start"}}>
            <div className="E-mail" >
                <p style={{color:"white",margin:'0'}} className="editProfile">{text}</p>
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" 
                id="flexSwitchCheckDefault" checked={val} onChange={changeToggle} />
            <label class="form-check-label" for="flexSwitchCheckDefault"></label>
            </div>
        </div>
    );
};

export default ToggleButton;