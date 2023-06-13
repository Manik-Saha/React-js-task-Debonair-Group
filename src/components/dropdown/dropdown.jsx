import React from "react";
import { useFormikContext } from "formik";

const DropdownField = ({ name, options, ...rest }) => {
  const { values, handleChange } = useFormikContext();
        console.log(options);

  return (
    <select name={name} onChange={handleChange} value={values[name]} {...rest}>
      {options.map((option) => (
        <option key={option.divID} value={option.divID}>
          {option.divisionName}
        </option>
      ))}
    </select>
  );
};

export default DropdownField;
