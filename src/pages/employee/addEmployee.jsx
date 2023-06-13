import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import DropdownField from "../../components/dropdown/dropdown";

function AddEmployee() {
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();

  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/Division")
      .then((response) => {
        console.log("Hi");
        setDivision(response.data.readDivisionData);
      });
  }, []);

  const getDivision = () => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/Division")
      .then((response) => {
        console.log("Hi");
        setDivision(response.data.readDivisionData);
      });
  };

  const getDistrict = (id) => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/District/${id}`)
      .then((response) => {
        setDistrict(response.data.readDivisionData);
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
            employeeType: "Admin",
            divisionId: 0,
            districeID: 0,
            disvision: "",
            district: "",
          };
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="">
              First Name <span className="text-danger">*</span>
            </label>
            <Field
              className="w-100 mb-2"
              type="text"
              name="firstName"
              placeholder="First name"
            />
            <ErrorMessage
              className="text-danger mb-2"
              name="firstName"
              component="div"
            />
            <label htmlFor="">
              Last Name <span className="text-danger">*</span>
            </label>
            <Field
              className="w-100 mb-2"
              type="text"
              name="lastName"
              placeholder="Last name"
            />
            <ErrorMessage
              className="text-danger mb-2"
              name="lastName"
              component="div"
            />
            <label htmlFor="">
              Division <span className="text-danger">*</span>
            </label>
            <Field
              name="dropdownValue"
              as={DropdownField}
              options={division ? division : null}
            />{" "}
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
