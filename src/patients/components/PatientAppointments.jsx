import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { getItem } from "../../utils/localStorageUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import dayjs from "dayjs";
import { formatDate, formatTimeRange } from "../../utils/dateFormate";

function PatientAppointments({ id }) {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [staffs, setStaffs] = useState([]);

  // Fetch appointments for the patient
  useEffect(() => {
    const allAppointments = getItem("appointments") || [];
    const patientAppointments = allAppointments.filter(
      (a) => a.extendedProps?.patientId === Number(id)
    );
    setAppointments(patientAppointments);

    const allStaffs = getItem("staffs") || [];
    setStaffs(allStaffs.filter((s) => s.role === "Doctor"));
  }, [id]);
  console.log(staffs);

  // Status badge component
  const StatusCell = ({ status }) => {
    let color;
    if (status === "Approved") color = "success";
    else if (status === "Pending") color = "warning";
    else if (status === "Cancelled") color = "error";

    return <Chip label={status} color={color} size="small" />;
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.extendedProps?.doctor,
        header: "Doctor",
        size: 200,
        Cell: ({ row }) => row.original.extendedProps.doctor,
      },
      {
        accessorFn: (row) => {
          const doctorId = row.extendedProps?.doctorId;
          const doctor = staffs.find((s) => s.id === doctorId);
          return doctor ? doctor.department : "-";
        },
        header: "Department",
        size: 200,
        Cell: ({ row }) => {
          const doctorId = row.original.extendedProps.doctorId;
          const doctor = staffs.find((s) => s.id === doctorId);
          return doctor ? doctor.department : "-";
        },
      },
      {
        accessorFn: (row) => formatDate(row.start),
        header: "Date",
        size: 200,
        Cell: ({ row }) => formatDate(row.original.start),
      },
      {
        accessorFn: (row) => {
          const start = row.extendedProps?.startTime;
          const end = row.extendedProps?.endTime;
          return formatTimeRange(start, end);
        },
        header: "Time",
        size: 200,
        Cell: ({ row }) => {
          const start = row.original.extendedProps?.startTime;
          const end = row.original.extendedProps?.endTime;

          return formatTimeRange(start, end);
        },
      },
      {
        accessorFn: (row) => row.extendedProps.status,
        header: "Status",
        size: 200,
        Cell: ({ row }) => (
          <StatusCell status={row.original.extendedProps.status} />
        ),
      },
      {
        accessorKey: "reason",
        header: "Reason",
        size: 200,
        Cell: ({ row }) => row.original.extendedProps?.reason || "-",
      },
    ],
    [staffs]
  );

  // Initialize table
  const table = useMaterialReactTable({
    columns,
    data: appointments,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
    enablePagination: true,
    enableColumnFilters: true,
    enableSorting: true,
    

    
  });



  return (
    <Box p={0}>
      <Box sx={{ height: 600, minHeight: 500, overflowX: "auto" }}>
        <MaterialReactTable table={table}
       
 

        />
      </Box>
    </Box>
  );
}

export default PatientAppointments;
