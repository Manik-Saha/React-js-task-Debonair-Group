import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "../../components/input/inputField";
import UserList from "./userList";

function AddUser() {
  return (
    <div>
      <h1 className="text-center">Register a new User</h1>
      <Formik
        initialValues={{ firstName: "", lastName: ""}}
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
            console.log(newUser)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="First Name" name="firstName" placeholder="Please enter your first name"></InputField>
            <InputField label="Last Name" name="lastName" placeholder="Please enter your last name"></InputField>

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

export default AddUser;
