import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/datatable";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddUser from "./addUser";

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
    
    // if (props) {
    //     const newArr = JSON.parse(userData ? userData : null);
    //     newArr.push(props.newUser)
    //     setUserData(JSON.stringify(newArr));
    // }

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
        Add new User
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
          <AddUser></AddUser>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;
