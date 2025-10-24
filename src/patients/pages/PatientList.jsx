import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,

  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
 
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
// import AddPatientModal from "../../Patients/modal/AddPatientModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getItem } from "../../utils/localStorageUtils";
import { statusPatient, trialStite } from "../../utils/constans";
import AddPatientModal from "../modals/AddPatientModal";


function PatientList() {
const theme = useTheme();
const navigate = useNavigate();

  const [siteFilter, setSiteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [patientsWithId, setPatientsWithId] = useState([]);
  const [addUpdate, setAddUpdate] = useState({});

  //  Load patients initially + whenever addUpdate changes
  useEffect(() => {
    const storedPatients = getItem("patients") || [];
    setPatientsWithId(storedPatients);
  }, [addUpdate]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        Cell: ({ row }) => {
          const firstName = row.original?.firstName;
          const lastName = row.original?.lastName;
          return `${lastName}, ${firstName}`;
        },
      },
      { accessorKey: "site", header: "Site", size: 100 },
      {
        accessorKey: "contacts",
        id: "contacts",
        header: "Phone",
        Cell: ({ row }) => {
          const firstContact = row.original.contacts?.[0];
          return firstContact
            ? `${firstContact.number} - ${firstContact.type}`
            : "-";
        },
      },
      {
        accessorKey: "dob",
        header: "DOB",
        size: 150,
        Cell: ({ cell }) => {
          const dobValue = cell.getValue();
          return dobValue ? dayjs(dobValue).format("MMM D, YYYY") : " ";
        },
      },
      { accessorKey: "createdBy", header: "Created By", size: 150 },
      { accessorKey: "patientStatus", header: "Status", size: 150 },
      {
        header: "Action",
        size: 50,
        Cell: ({ row }) => (
          <Tooltip title="View Details">
            <IconButton
            
              onClick={() => handleView(row.original)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  // Apply filters
  const filteredPatients = useMemo(() => {
    return patientsWithId.filter((patient) => {
      const siteMatch =
        siteFilter && siteFilter !== "All" ? patient.site === siteFilter : true;
      const statusMatch =
        statusFilter && statusFilter !== "All"
          ? patient.patientStatus === statusFilter
          : true;
      return siteMatch && statusMatch;
    });
  }, [siteFilter, statusFilter, patientsWithId]);

  // Initialize table
  const table = useMaterialReactTable({
    columns,
    data: filteredPatients,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
    enablePagination: true,
  });

  // Navigate to detail view
  const handleView = (patient) => {
    navigate(`/dashboard/patientDetails/${patient.id}`);
  };
  return (
    <>
    <Box  sx={{bgcolor: theme.palette.background.paper,   }}>
   <Box  sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
            borderRadius: 2,
            mb: 3,
          }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          
        >
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Patients
          </Typography>
          <AddPatientModal setAddUpdate={setAddUpdate} />
        </Box>
  
        {/* Filter Section */}
        <Box display="flex" gap={2} mb={2}>
    {/* Trial Sites */}
    <FormControl sx={{ minWidth: 180, }}>
      <InputLabel>Trial Sites</InputLabel>
      <Select
        value={siteFilter}
        onChange={(e) => setSiteFilter(e.target.value)}
        label="Trial Sites"
        size="small"
      >
        {trialStite.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  
    {/* Status */}
    <FormControl sx={{ minWidth: 180, }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        label="Status"
        
        size="small"
      >
        {statusPatient.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
   </Box>

      {/* Table */}
     <Box sx={{ width: "100%",   }}>
  <MaterialReactTable table={table} />
</Box>
    </Box>
    </>
  )
}

export default PatientList