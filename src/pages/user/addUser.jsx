import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
