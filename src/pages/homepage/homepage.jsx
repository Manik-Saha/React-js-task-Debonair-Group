import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserList from "../user/userList";
import EmployeeList from "../employee/employeeList";

function Homepage() {
    const [value, setValue] = React.useState(0);

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
        <Box >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="User"></Tab>
            <Tab label="Employees"></Tab>
          </Tabs>
          
            <TabPanel value={value} index={0}>
              <UserList></UserList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EmployeeList></EmployeeList>
            </TabPanel>
         
        </Box>
      </div>
    );
}

export default Homepage;