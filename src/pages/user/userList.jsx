import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/datatable";
import { Link } from "react-router-dom";

function UserList() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
      .then((response) => {
        setUserData(
          response.data.readEmployeeData.filter((user) => {
            return user.employeeType === "Admin";
          })
        );
      });
  }, []);

  const columns = [
    { field: "empID", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last name" },
    { field: "district", headerName: "District" },
    { field: "disvision", headerName: "Division" },
    { field: "employeeType", headerName: "Employee Type" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Link
          label="Details"
          className="btn btn-outline-success"
          to={`/user/details/${params.row.empID}`}
        >
          Details
        </Link>
      ),
    },
  ];

  return (
    <div>
      {userData ? (
        // use datatable component to view user data
        <DataTable rows={userData} columns={columns}></DataTable>
      ) : null}
    </div>
  );
}

export default UserList;
