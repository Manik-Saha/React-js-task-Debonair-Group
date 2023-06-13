import React from "react";
import { ErrorMessage } from "formik";

const DropdownField = (props) => {

return (
<div>
  {console.log(props)}
  <label htmlFor="">
    {props.label} <span className="text-danger">*</span>
  </label>
  <select name={props.name}>
    {props.data.map((option) => (
    <option key={option.divID} value={option.divID}>
      {option.divisionName}
    </option>
    ))}
  </select>
  <ErrorMessage className="text-danger mb-2" name={props.name} component="div" />
</div>
);
};

export default DropdownField;
