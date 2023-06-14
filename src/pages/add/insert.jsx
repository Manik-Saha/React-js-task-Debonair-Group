import React, { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../../components/input/inputField";
import DivisionDistrict from "../../components/dropdown/divisionDistrict";
import Alert from "@mui/material/Alert";
import axios from "axios";
import DropDown from "../../components/dropdown/dropdown";
import * as Yup from "yup";
import Button from "../../components/button/button";

function Insert(props) {
const [type, setType] = useState();

const empType = (type) => {
    setType(type);
};

const initialValues = {
    firstName: "",
    lastName: "",
    disvision: "",
    district: "",
    divisionId: "",
    districeID: "",
    employeeType: "",
};

// method for validation
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .required("Please enter first name!")
    .min(2, "Name cannot be less than 2 characters")
    .matches(
        /^[a-zA-Z\s]*$/,
        "Invalid name, Name can't contain special & numerical characters"
    ),
    lastName: Yup.string()
    .required("Please enter last name!")
    .min(2, "Name cannot be less than 2 characters")
    .matches(
        /^[a-zA-Z\s]*$/,
        "Invalid name, Name can't contain special & numerical characters"
    ),

    employeeType: Yup.string().required("Please select employee type!"),

    disvision: Yup.string().when("employeeType", ([employeeType, schema]) => {
    if (employeeType === "Employee")
        return Yup.string().required("Please select a division!");
    return schema;
    }),

    district: Yup.string().when("employeeType", ([employeeType, schema]) => {
    if (employeeType === "Employee")
        return Yup.string().required("Please select a district!");
    return schema;
    }),
});
// method for validation end

const insertEmployee = (values) => {
    const newUser = {
    firstName: values.firstName,
    lastName: values.lastName,
    employeeType: values.employeeType,
    divisionId: values.disvision,
    districeID: values.district,
    disvision: values.disvision,
    district: values.district,
    };

    axios
    .post("http://59.152.62.177:8085/api/SaveEmployeeInformation", newUser)
    .then((response) => {
        if (response) {
        props.setOpen(false);
        <Alert severity="success">User added successfully.</Alert>;
        } else {
        throw new Error("Failed to add user");
        }
    })
    .catch((error) => {
        <Alert severity="error">{error}</Alert>;
        props.setOpen(false);
    });
};

return (
    <div>
    <h1 className="text-center text-success mb-4">Register a new Employee</h1>
    <Formik
        initialValues={initialValues}
        onSubmit={insertEmployee}
        validationSchema={validationSchema}
    >
        <Form>
        <InputField
            label="First Name"
            name="firstName"
            placeholder="Please enter your first name"
        ></InputField>
        <InputField
            label="Last Name"
            name="lastName"
            placeholder="Please enter your last name"
        ></InputField>

        <DropDown
            onChange={(event) => {
            empType(event.target.value);
            }}
            label="Employee Type"
            name="employeeType"
            options={["-", "Admin", "Employee"]}
        ></DropDown>

        {type ? (
            type === "Employee" ? (
            <DivisionDistrict district="" disvision=""></DivisionDistrict>
            ) : null
        ) : null}

        <Button
            type="submit"
            label="Submit"
            className="btn btn-primary d-flex mx-auto mt-3"
        ></Button>
        </Form>
    </Formik>
    </div>
);
}

export default Insert;
