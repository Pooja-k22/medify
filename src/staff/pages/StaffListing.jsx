import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import AddStaffModal from "../modals/AddStaffModal";
import { getItem } from "../../utils/localStorageUtils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { getPaperStyles } from "../../utils/tableTheme";

function StaffListing() {
  const theme = useTheme()
  const tableStyles = getPaperStyles(theme);
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [addUpdate, setAddUpdate] = useState({});

  useEffect(() => {
    const storedstaffs = getItem("staffs");
    setStaffs(storedstaffs);
  }, [addUpdate]);

  console.log(staffs);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Name",
        size: 150,
        Cell: ({ row }) => {
          const firstName = row.original?.firstName;
          const lastName = row.original?.lastName;
          return `${lastName}, ${firstName}`;
        },
      },
      { accessorKey: "role", header: "Role", size: 100 },

      { accessorKey: "status", header: "Status", size: 150 },
      {
        header: "Action",
        size: 50,
        Cell: ({ row }) => (
          <Tooltip title="View Details">
            <IconButton onClick={() => handleView(row.original)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  // Initialize table
  const table = useMaterialReactTable({
    columns,
    data: staffs,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
    enablePagination: true,
    enableColumnFilters: true,
     muiTablePaperProps: {
    sx: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  muiTableContainerProps: {
    sx: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  muiTableBodyProps: {
    sx: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  muiTableHeadProps: {
    sx: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  });

  // Navigate to detail view
  const handleView = (data) => {
    navigate(`/dashboard/staff-details/${data.id}`);
  };
  return (
    <>
      <Box sx={{bgcolor: theme.palette.background.paper,}}>
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              Staffs
            </Typography>
            <AddStaffModal setAddUpdate={setAddUpdate} />
          </Box>

        </Box>

        {/* Table */}
        <Box sx={{ width: "100%", height: 600, overflowX: "auto" }}>
          <MaterialReactTable
            table={table}
            
          />
        </Box>
      </Box>
    </>
  );
}

export default StaffListing;
