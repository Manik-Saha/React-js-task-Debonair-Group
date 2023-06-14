import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import axios from "axios";

const DivisionDistrict = (props) => {
const [division, setDivision] = useState();
const [district, setDistrict] = useState();

useEffect(() => {
    getDivision();
    if (props.disvision) {
    getDistrict(props.disvision);
    }
}, []);

const getDivision = () => {
    axios
    .get("http://59.152.62.177:8085/api/Employee/Division")
    .then((response) => {
        setDivision(response.data.readDivisionData);
    });
};

const getDistrict = (id) => {
    axios
    .get(`http://59.152.62.177:8085/api/Employee/District/${id}`)
    .then((response) => {
        setDistrict(response.data.readDistrictData);
    });
};
return (
    <div>
    <label htmlFor="">
        Division <span className="text-danger">*</span>
    </label>
    <Field
        as="select"
        onChange={(event) => {
        getDistrict(event.target.value);
        }}
        className="w-100 mb-2"
        name="division"
        id="division"
    >
        {division
        ? division.map((data) => (
            <option
                value={data.divID}
                selected={data.divID == props.disvision}
            >
                {data.divisionName}
            </option>
            ))
        : null}
    </Field>
    <ErrorMessage
        className="text-danger mb-2"
        name="disvision"
        component="div"
    />

    <label htmlFor="">
        District <span className="text-danger">*</span>
    </label>
    <select className="w-100 mb-2" name="district" id="district">
        {district
        ? district.map((data) => (
            <option
                value={data.districtID}
                selected={data.districtID == props.district}
            >
                {data.districtName}
            </option>
            ))
        : null}
    </select>
    <ErrorMessage
        className="text-danger mb-2"
        name="district"
        component="div"
    />
    </div>
);
};

export default DivisionDistrict;
