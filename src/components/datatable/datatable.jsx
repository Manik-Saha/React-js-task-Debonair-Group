import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DataTable(props) {
    return (
      <div>
        <DataGrid
          getRowId={(row) => row.empID}
          rows={props.rows}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
        />
      </div>
    );
}

export default DataTable;