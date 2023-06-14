import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/button";
import InputField from "../../components/input/inputField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Alert from "@mui/material/Alert";
import DivisionDistrict from "../../components/dropdown/divisionDistrict";
import * as Yup from "yup";

function UserDetails() {
const params = useParams();
const [userDetails, setUserDetails] = useState();
const [editMode, setEditMode] = useState(false);
const [label, setLabel] = useState("Edit Information");
const [className, setClassName] = useState("btn btn-primary mx-2");
const [type, setType] = useState();

const empType = (type) => {
    setType(type);
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

// method for submit the form to update information
const updateInfo = async (values) => {
    await axios
    .put(
        `http://59.152.62.177:8085/api/UpdateEmployeeInformation/${values.empID}`,
        values
    )
    .then((response) => {
        if (response) {
        <Alert severity="success">User updated successfully.</Alert>;
        }
        if (!response.ok) {
        throw new Error("Failed to update user");
        }
    })
    .catch((error) => {
        <Alert severity="error">{error}</Alert>;
    });
};
// method for submit the form to update information end

const EditInfo = () => {
    setEditMode(true);
    setLabel("Update Information");
    setClassName("btn btn-info mx-2");
};

const cancelBTn = () => {
    setEditMode(false);
    setLabel("Edit Information");
    setClassName("btn btn-primary mx-2");
};

useEffect(() => {
    axios
    .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
    .then((response) => {
        const singleUser = response.data.readEmployeeData.find((user) => {
        return user.empID == params.id;
        });
        setUserDetails(singleUser);
    });
}, []);

//initializing the form values
const initialValues = {
    firstName: userDetails ? userDetails.firstName : null,
    lastName: userDetails ? userDetails.lastName : null,
    disvision: userDetails ? userDetails.disvision : null,
    district: userDetails ? userDetails.district : null,
    empID: userDetails ? userDetails.empID : null,
    employeeType: userDetails ? userDetails.employeeType : null,
};

return (
    <div className="mx-5 mt-3">
    <h1 className="text-center mt-3">User Details</h1>
    {userDetails ? (
        <div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateInfo}
        >
            <Form>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Employee ID</td>
                    <td>{userDetails.empID}</td>
                </tr>
                <tr>
                    <td>First name</td>
                    <td>
                    {editMode ? (
                        <InputField
                        label="First Name"
                        name="firstName"
                        placeholder="Please enter your first name"
                        ></InputField>
                    ) : (
                        userDetails.firstName
                    )}
                    </td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>
                    {editMode ? (
                        <InputField
                        label="Last Name"
                        name="lastName"
                        placeholder="Please enter your first name"
                        ></InputField>
                    ) : (
                        userDetails.lastName
                    )}
                    </td>
                </tr>
                <tr>
                    <td>Employee Type</td>
                    <td>
                    {editMode ? (
                        <div>
                        <label htmlFor="">
                            District <span className="text-danger">*</span>
                        </label>
                        <Field
                            as="select"
                            className="w-100 mb-2"
                            name="employeeType"
                            onChange={(event) => {
                                empType(event.target.value);
                            }}
                        >
                            <option
                            selected={userDetails.employeeType == "Admin"}
                            value="Admin"
                            >
                            Admin
                            </option>
                            <option
                            selected={userDetails.employeeType == "Employee"}
                            value="Employee"
                            >
                            Employee
                            </option>
                        </Field>
                        <ErrorMessage
                            className="text-danger mb-2"
                            name="employeeType"
                            component="div"
                        />
                        </div>
                    ) : (
                        userDetails.employeeType
                    )}
                    </td>
                </tr>
                {userDetails.employeeType == "Employee" && !editMode ? (
                    <tr>
                    <td>District</td>
                    <td>{userDetails.district}</td>
                    </tr>
                ) : null}
                {userDetails.employeeType == "Employee" && !editMode ? (
                    <tr>
                    <td>Division</td>
                    <td>{userDetails.disvision}</td>
                    </tr>
                ) : null}
                {editMode &&( userDetails.employeeType === "Employee" || type === "Employee") ? (
                    <tr>
                    <td>Division/District</td>
                    <DivisionDistrict
                        district={userDetails.districeID}
                        disvision={userDetails.divisionId}
                    ></DivisionDistrict>
                    </tr>
                ) : null}
                </tbody>
            </table>
            <div className="d-flex mx-auto">
                <Button
                label={label ? label : null}
                className={className}
                onClick={EditInfo}
                ></Button>
                {editMode ? (
                <Button
                    label="Cancel"
                    className="btn btn-danger"
                    onClick={cancelBTn}
                ></Button>
                ) : null}
            </div>
            </Form>
        </Formik>
        </div>
    ) : null}
    </div>
);
}

export default UserDetails;
