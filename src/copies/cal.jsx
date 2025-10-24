import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getItem, setItem } from "../../utils/localStorageUtils";

//  Validation schema
const schema = yup.object().shape({
  patient: yup.string().required("Patient name is required"),
  doctor: yup.string().required("Doctor name is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        return !startTime || !value || value > startTime;
      }
    ),
});

//const LOCAL_KEY = "appointments";

const AppointmentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      patient: "",
      doctor: "",
      startTime:"",
      endTime:""
    },
  });

  //  Load appointments from localStorage
  useEffect(() => {
    const saved = getItem("LOCAL_KEY");
    if (saved) setEvents(saved);
    const patientsData = getItem("patients");
    if (patientsData) {
      const activePatients = patientsData.filter(
        (p) => p.patientStatus === "Active"
      );
      setPatients(activePatients);
    }
    const staffsData = getItem("staffs");
    if (staffsData) {
      const doctorsData = staffsData.filter((p) => p.role === "Doctor");
      setDoctors(doctorsData);
    }
  }, []);

  console.log(patients);

  //  When a date is clicked
  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    setOpen(true);
  };

  const handleClose = () => {
  setOpen(false);
  reset();         
  setIsEdit(false);
  setSelectedEvent(null);
  setSelectedDate(null);
};


  //  On submit
  const onSubmit = (data) => {
    const newEvent = {
      title: `${data.patient} (${data.doctor}) at ${data.time}`,
      start: selectedDate,
      allDay: true,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setItem("LOCAL_KEY", updatedEvents);
    setOpen(false);
    reset();
  };

  const handleEventClick = (info) => {
    const eventDate = new Date(info.event.start);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      alert("You cannot edit or delete past appointments.");
      return;
    }

    setSelectedEvent(info.event);
    setIsEdit(true);

    // Prefill form fields
    const [patientName, doctorPart] = info.event.title.split(" (");
    const doctorName = doctorPart?.split(")")[0];
    const timePart = info.event.title.split("at ")[1];

    setValue("patient", patientName.trim());
    setValue("doctor", doctorName.trim());
    setValue("startTime", timePart.trim().split("-")[0]?.trim() || "");
    setValue("endTime", timePart.trim().split("-")[1]?.trim() || "");
    setOpen(true);
  };

  const handleDelete = () => {
  if (!selectedEvent) return;

  
    const updatedEvents = events.filter(
      (ev) =>
        !(
          ev.doctor == selectedEvent.doctor &&
          ev.starttime == selectedEvent.starttime
        )
    );
    setEvents(updatedEvents);
    setItem("LOCAL_KEY", updatedEvents);
    handleClose(); 
  
};


  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Appointment
      </Typography>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        height="auto"
        eventDidMount={(info) => {
          const eventDate = new Date(info.event.start);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (eventDate < today) {
            info.el.style.opacity = "0.5";
            info.el.style.pointerEvents = "none";
          }
        }}
      />

      {/* Appointment dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{display:"flex", justifyContent:'space-between', alignItems:'center'}}>
           <div> Book Appointment</div>
           <IconButton onClick={handleClose}>
            X
           </IconButton>
           </Box>
          </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} mt={1}>
              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="patient"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.patient}
                    >
                      <InputLabel id="patient-label">Patient</InputLabel>
                      <Select
                        {...field}
                        labelId="patient-label"
                        label="Patient"
                      >
                        {patients?.map((p, index) => (
                          <MenuItem
                            key={index}
                            value={`${p.firstName} ${p.lastName}`}
                          >
                            {p.firstName} {p.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.patient?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Controller
                  name="doctor"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.doctor}>
                      <InputLabel id="doctor-label">Doctor</InputLabel>
                      <Select {...field} labelId="doctor-label" label="Doctor">
                        {doctors.map((d, index) => (
                          <MenuItem
                            key={index}
                            value={`${d.firstName} ${d.lastName}`}
                          >
                            {d.firstName} {d.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.doctor?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

          
                <Grid item size={{xs:6}}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Start Time"
                        type="time"
                        fullWidth
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
  
                <Grid item size={{xs:6}}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="End Time"
                        type="time"
                        fullWidth
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
           

            <Grid container>
                <Grid item size={{xs:6}}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </Grid>
  
                {isEdit && (
                  <Grid item size={{xs:6}}>
                    <Button
                      variant="outlined"
                      //color="error"
                      fullWidth
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
            </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AppointmentCalendar;
