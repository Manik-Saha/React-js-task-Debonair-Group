import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import DropdownField from "../../components/dropdown/dropdown";
import InputField from "../../components/input/inputField";

function AddEmployee() {
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();

  useEffect(() => {
    getDivision();
  }, []);

  const getDivision = () => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/Division")
      .then((response) => {
        setDivision(response.data.readDivisionData);
      });
  };

  const getDistrict = (id) => {
    setDivision(id)
    axios
      .get(`http://59.152.62.177:8085/api/Employee/District/${id}`)
      .then((response) => {
        setDistrict(response.data.readDistrictData);
      });
  };

  return (
    <div>
      <h1 className="text-center">Register a new User</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Please enter your first name!";
          }
          if (!values.lastName) {
            errors.lastName = "Please enter your last name!";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const newUser = {
            firstName: values.firstName,
            lastName: values.lastName,
            employeeType: "Employee",
            divisionId: 0,
            districeID: 0,
            disvision: "",
            district: "",
          };
          console.table(newUser)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="First Name" name="firstName" placeholder="Please enter your first name"></InputField>
            <InputField label="Last Name" name="lastName" placeholder="Please enter your last name"></InputField>

            <label htmlFor="">
              Division <span className="text-danger">*</span>
            </label>
            <select onChange={(event) => {
              getDistrict(event.target.value);
            }} className="w-100 mb-2" name="" id="">
              {
                division ? division.map((data) => 
                  <option value={data.divID}>{data.divisionName}</option>
                ) : null
              }
            </select>
            <ErrorMessage
              className="text-danger mb-2"
              name="lastName"
              component="div"
            />
            <select className="w-100 mb-2" name="" id="">
              {
                district ? district.map((data) => 
                  <option value={data.districtID}>{data.districtName}</option>
                ) : null
              }
            </select>
            <ErrorMessage
              className="text-danger mb-2"
              name="lastName"
              component="div"
            />
            <button
              className="btn btn-primary d-flex mx-auto"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEmployee;
