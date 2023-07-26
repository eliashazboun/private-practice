import React, { useState } from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  const { label, errorMessage,options, onChange, id, ...inputProps } =
    props;

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="formInput">
                <label>{label}</label>

 
      {inputProps.type === "select" ? (

        <select onChange={onChange} {...inputProps}>
            {options.map((option, index) => {
            return <option key={index}>{option}</option>
            })}
        </select>
        
      ) : (
        <>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
        />
        <span className="errorMessage">{errorMessage}</span>
        </>
      )}

      
    </div>
  );
};

export default FormInput;
