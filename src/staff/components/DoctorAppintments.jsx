import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getItem, setItem } from "../../utils/localStorageUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import dayjs from "dayjs";
import ActionCell from "./ActionCell ";
import { formatDate, formatTimeRange } from "../../utils/dateFormate";
import { statusOption } from "../../utils/constans";

function DoctorAppointments({ id }) {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
const [availableDates, setAvailableDates] = useState([]);

  // Fetch appointments for the doctor
  useEffect(() => {
    const allAppointments = getItem("appointments") || [];
    const doctorAppointments = allAppointments.filter(
      (a) => a.extendedProps?.doctorId === Number(id)
    ).sort((a, b) => new Date(b.start) - new Date(a.start));
    setAppointments(doctorAppointments);
  }, [id]);

  useEffect(() => {
  const allAppointments = getItem("appointments") ;
  const uniqueDates = [
    ...new Set(
      allAppointments.map((a) => a.start)
    ),
  ];

  setAvailableDates(uniqueDates);
}, []);

  // Status badge component
  const StatusCell = ({ status }) => {
    let color;
    if (status === "Approved") color = "success";
    else if (status === "Pending") color = "warning";
    else if (status === "Cancelled") color = "error";

    return <Chip label={status} color={color} size="small" />;
  };

  const filteredAppointments = useMemo(() => {
  return appointments.filter((appt) => {
    const statusMatch =
      statusFilter && statusFilter !== "All"
        ? appt.extendedProps?.status === statusFilter
        : true;

    const dateMatch =
      selectedDate
        ? appt.start === selectedDate
        : true;

    return statusMatch && dateMatch;
  });
}, [appointments, statusFilter, selectedDate]);


  // Table columns
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.extendedProps?.patient,
        header: "Patient",
        size: 200,
        Cell: ({ row }) => row.original.extendedProps.patient,
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
        accessorFn: (row)=>row.extendedProps.status,
        header: "Status",
        size: 200,
        Cell: ({ row }) => (
          <StatusCell status={row.original.extendedProps.status} />
        ),
        
      },
      {
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <ActionCell
            row={row}
            doctorId={id}
            setAppointments={setAppointments}
          />
        ),
      },
    ],
    []
  );

  // Initialize table
  const table = useMaterialReactTable({
    columns,
    data: filteredAppointments,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      //sorting: [{ id: 'Date', desc: true }],
    },
    enablePagination: true,
    enableColumnFilters: true,
    enableSorting: true,
  });

  return (
    <Box p={0}>
 <Box sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
            borderRadius: 2,
            my: 3,
          }}>
        <Box  display="flex" gap={2} alignItems="center" my={2}>
    {/* Status Filter */}
    <FormControl sx={{ minWidth: 180, }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
          
          size="small"
        >
          {statusOption.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  
    {/* Date Range Filters */}
   <FormControl sx={{ minWidth: 180, }}>
        <InputLabel>Date</InputLabel>
        <Select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Date"
          
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {availableDates.map((item) => (
            <MenuItem key={item} value={item}>
              {formatDate(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  </Box>
 </Box>

      
        <Box sx={{ height: 600, overflowX: "auto" ,mt:5}}>
          <MaterialReactTable table={table} />
        </Box>
      
    </Box>
  );
}

export default DoctorAppointments;
