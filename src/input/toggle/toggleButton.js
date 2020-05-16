import React from "react";
import "./toggleButton.css";

const ToggleButton = props => {
  return (
    <div className="switch" onClick={props.changed}>
      <input
        type={props.type}
        checked={props.elementConfig.checked}
        onChange={props.changed}
        className="toggle"
      />
      <span className="slider" />
    </div>
  );
};

export default ToggleButton;
