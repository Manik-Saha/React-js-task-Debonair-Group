import React from "react";
import { Field, ErrorMessage } from "formik";

function InputField({ label, name, placeholder }) {
  <div>
    <label htmlFor="">
      {label} <span className="text-danger">*</span>
    </label>
    <Field
      className="w-100 mb-2"
      type="text"
      name={name}
      placeholder={placeholder}
    />
    <ErrorMessage className="text-danger mb-2" name={name} component="div" />
  </div>;
}

export default InputField;
