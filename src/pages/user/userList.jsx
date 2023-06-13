import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/datatable";
import Modal from "@mui/material/Modal";
import AddUser from "./addUser";
import Button from "../../components/button/button";

function UserList(props) {
  const [userData, setUserData] = useState();
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

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

  const details = (id) => {

  }
    

  const columns = [
    { field: "empID", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last name" },
    { field: "district", headerName: "District" },
    { field: "disvision", headerName: "Division" },
    { field: "employeeType", headerName: "Employee Type" },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button label="Details" className="btn btn-outline-info" onClick={() => {details(params.row.id)}}></Button>
      ),
    },
  ];

  return (
    <div>
      <Button label="Add new User" className="btn btn-outline-primary my-3" onClick={modalOpen}></Button>
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
          <Button label="close" className="btn btn-outline-danger my-3" onClick={modalClose}></Button>
          <AddUser></AddUser>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;
