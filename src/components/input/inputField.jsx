import React from "react";
import { Field, ErrorMessage } from "formik";

function InputField(props) {
  return(
  <div>
    <label htmlFor="">
      {props.label} <span className="text-danger">*</span>
    </label>
    <Field
      className="w-100"
      type="text"
      name={props.name}
      placeholder={props.placeholder}
    />
    <ErrorMessage className="text-danger mb-2" name={props.name} component="div" />
  </div>
  );
}

export default InputField;
