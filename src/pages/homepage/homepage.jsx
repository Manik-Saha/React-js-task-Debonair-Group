import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserList from "../user/userList";
import EmployeeList from "../employee/employeeList";
import Button from "../../components/button/button";
import Modal from "@mui/material/Modal";
import Insert from "../add/insert";

function Homepage() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
      <Tabs
        className="border mx-5 my-3"
        value={value}
        onChange={handleChange}
        centered
      >
        {/* tab name */}
        <Tab label="User"></Tab>
        <Tab label="Employees"></Tab>
      </Tabs>

      {/* button for open the modal for adding new users */}
      <Button
        label="Add new Employee"
        className="btn btn-outline-primary mb-3 mx-5"
        onClick={modalOpen}
      ></Button>

      {/* tab body */}
      <TabPanel className="mx-3" value={value} index={0}>
        <UserList></UserList>
      </TabPanel>
      <TabPanel className="mx-3" value={value} index={1}>
        <EmployeeList></EmployeeList>
      </TabPanel>

      {/* Modal Open for adding a new employee */}
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-style">
          <Button
            label={<i class="bi bi-x-lg"></i>}
            className="btn btn-outline-danger cross-btn"
            onClick={modalClose}
          ></Button>
          <Insert setOpen={setOpen}></Insert>
        </div>
      </Modal>
    </div>
  );
}

export default Homepage;
