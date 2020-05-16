import React from "react";
import "./input.css";
import ToggleButton from "./toggle/toggleButton";

const input = props => {
  let inputElement = null;

  let classes = ["inputElement"];

  if (props.invalid && props.shouldValidate && props.touched) {
    classes.push("errorClass");
  }

  switch (props.type) {
    case "textarea": {
      inputElement = (
        <textarea
          type={props.type}
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
          className={classes.join(" ")}
        />
      );
      break;
    }
    case "checkbox": {
      inputElement = <ToggleButton {...props} />;
      break;
    }
    case "toggle": {
      inputElement = (
        <ToggleButton value={props.value} changed={props.changed} />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select
          type={props.type}
          value={props.value}
          onChange={props.changed}
          className={classes.join(" ")}
        >
          {props.elementConfig.options.map(item => {
            return (
              <option key={item.value} value={item.value}>
                {item.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    }
    default: {
      inputElement = (
        <input
          type={props.inputType}
          value={props.value}
          onChange={props.changed}
          {...props.elementConfig}
          className={classes.join(" ")}
        />
      );
    }
  }

  return (
    <div className="input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
