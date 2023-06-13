import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/datatable";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddEmployee from "./addEmployee";

function EmployeeList() {
  const [userData, setUserData] = useState();
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    axios
      .get("http://59.152.62.177:8085/api/Employee/EmployeeData")
      .then((response) => {
        setUserData(
          response.data.readEmployeeData.filter((user) => {
            return user.employeeType !== "Admin";
          })
        );
      });
  };

  const columns = [
    { field: "empID", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last name" },
    { field: "district", headerName: "District" },
    { field: "disvision", headerName: "Division" },
    { field: "employeeType", headerName: "Employee Type" },
  ];

  return (
      <div>
      <Button onClick={modalOpen} className="mb-3" variant="outlined">
        Add new Employee
      </Button>
      {userData ? (
        <DataTable rows={userData} columns={columns}></DataTable>
      ) : null}
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-style">
          <AddEmployee></AddEmployee>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeList;
