import React from "react";
import { ErrorMessage } from "formik";

const DropDown = (props) => {
  return (
    <div>
      <label htmlFor="">
        {props.label} <span className="text-danger">*</span>
      </label>
      <select 
        className="w-100"
        name={props.name}
        onChange={props.onChange}
      >
        {props.options
          ? props.options.map((data) => <option value={data}>{data}</option>)
          : null}
      </select>
      <ErrorMessage
        className="text-danger mb-2"
        name={props.name}
        component="div"
      />
    </div>
  );
};

export default DropDown;
