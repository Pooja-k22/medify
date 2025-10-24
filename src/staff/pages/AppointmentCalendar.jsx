import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getItem, setItem } from "../../utils/localStorageUtils";
import { combineDateTime, isTimeOverlap } from "../../utils/dateTime";
import { useToast } from "../../hooks/useToast";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarschema } from "../../utils/yupValidations";
import { formatDateOnly } from "../../utils/dateFormate";
import ResponsiveCalendarHeader from "../../utils/ResponsiveCalendarHeader";

const AppointmentCalendar = () => {
    const isMobile = useMediaQuery("(max-width: 600px)");

  const { showToast } = useToast();
  const theme = useTheme();
  const headerToolbar = ResponsiveCalendarHeader();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(calendarschema),
    defaultValues: {
      patient: "",
      doctor: "",
      startTime: null,
      endTime: null,
    },
  });

  //  Load data from localStorage
  useEffect(() => {
    // appointments
    const saved = getItem("appointments");
    if (saved) setEvents(saved);

    // patients
    const patientsData = getItem("patients");
    if (patientsData) {
      const activePatients = patientsData.filter(
        (p) => p.patientStatus === "Active"
      );
      setPatients(activePatients);
    }
    // doctors
    const staffsData = getItem("staffs");
    if (staffsData) {
      const doctorsData = staffsData.filter(
        (p) => p.role === "Doctor" && p.status === "Active"
      );
      setDoctors(doctorsData);
    }
  }, []);

  //console.log(patients);

  //on click date
  const handleDateClick = (info) => {
    const clickedDate = info.date;
    //console.log(clickedDate);

    const today = new Date();
    //console.log(today);

    clickedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (clickedDate < today) {
      showToast("You cannot book appointments for past dates.", "warning");
      return;
    }
    setSelectedDate(info.date);
    setOpen(true);
    setIsEditMode(false);
    setIsEditable(true);
  };

  // close
  const handleClose = () => {
    setOpen(false);
    reset();
    setIsEditMode(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  // event click
  const handleEventClick = (info) => {
    const eventDate = new Date(info.event.start);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fullEvent = events.find((ev) => ev.id === parseInt(info.event.id));
    if (!fullEvent) return;

    setSelectedEvent(fullEvent);
    setSelectedDate(new Date(fullEvent.start));

    const isPast = eventDate < today;
    setIsEditable(!isPast);
    setIsEditMode(!isPast);

    // Prefill form fields
    setValue("patient", fullEvent.extendedProps.patient);
    setValue("doctor", fullEvent.extendedProps.doctor);
    setValue("startTime", dayjs(fullEvent.extendedProps.startTime));
    setValue("endTime", dayjs(fullEvent.extendedProps.endTime));
    setValue("reason", fullEvent.extendedProps.reason || " ");
    setOpen(true);
  };

  //  On submit
  const onSubmit = (data) => {
    const startDateTime = combineDateTime(selectedDate, data.startTime);
    const endDateTime = combineDateTime(selectedDate, data.endTime);

    // Find selected doctor and patient
    const selectedDoctor = doctors.find(
      (d) => `${d.lastName} ${d.firstName}` === data.doctor
    );
    const selectedPatient = patients.find(
      (p) => `${p.lastName} ${p.firstName}` === data.patient
    );
    console.log(selectedDate);
    console.log(data.start);

    // will get appointments for same doctor on same date
    const doctorAppointments = events.filter((ev) => {
      const evDate = formatDateOnly(ev.start);
      const selected = formatDateOnly(selectedDate);

      return (
        ev.extendedProps?.doctorId === selectedDoctor.id &&
        evDate === selected &&
        ev.extendedProps?.status !== "Cancelled" &&
        (!isEditMode || ev.id !== selectedEvent?.id)
      );
    });

    //compare current event time with already exist event 
    const hasOverlap = doctorAppointments.some((ev) =>
      isTimeOverlap(
        ev.extendedProps.startTime,
        ev.extendedProps.endTime,
        data.startTime,
        data.endTime
      )
    );

    if (hasOverlap) {
      showToast(
        "This doctor already has an appointment at this time.",
        "error"
      );
      return;
    }

    // Create event object
    const eventData = {
      title: `${data.patient} (${data.doctor})`,
      start: startDateTime,
      end: endDateTime,
      allDay: false,
      extendedProps: {
        doctorId: selectedDoctor.id,
        patientId: selectedPatient.id,
        doctor: data.doctor,
        patient: data.patient,
        startTime: data.startTime,
        endTime: data.endTime,
        status: "Pending",
      },
    };

    let updatedEvents;

    if (isEditMode && selectedEvent) {
      // Update existing event
      updatedEvents = events.map((ev) =>
        ev.id === selectedEvent.id ? { ...ev, ...eventData } : ev
      );
    } else {
      // Add new event
      const newEvent = {
        id: Date.now(),
        ...eventData,
      };
      updatedEvents = [...events, newEvent];
    }

    // Update state and localStorage
    setEvents(updatedEvents);
    setItem("appointments", updatedEvents);
    handleClose();
  };

  // delete
  const handleDelete = () => {
    if (!selectedEvent) return;

    const updatedEvents = events.filter((ev) => ev.id !== selectedEvent.id);
    setEvents(updatedEvents);
    setItem("appointments", updatedEvents);
    handleClose();
  };

  return (
    <Box p={3}  sx={{
    ".fc-toolbar-title": {
      fontSize: isMobile ? "1rem" : "1.5rem",
      textAlign: isMobile ? "right" : "center",
    },
    ".fc-button": {
      fontSize: isMobile ? "0.75rem" : "0.9rem",
      padding: isMobile ? "0.2rem 0.4rem" : "0.5rem 0.8rem",
    },
    ".fc-toolbar .fc-toolbar-chunk": {
      gap: isMobile ? "0.25rem" : "0.5rem",
    },
  }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Appointment
      </Typography>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        height="auto"
        eventDidMount={(info) => {
          const eventDate = info.event.start;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (eventDate < today) {
            info.el.style.opacity = "0.5";
          }
        }}
        eventContent={(eventInfo) => {
          let bgColor = "#d2c748ff";
          const status = eventInfo.event.extendedProps.status;
          if (status === "Approved") bgColor = "green";
          else if (status === "Cancelled") bgColor = "red";

          return (
            <div
              style={{
                padding: "2px",
                margin: "2px",
                backgroundColor: bgColor,
              }}
            >
              {eventInfo.event.title}
            </div>
          );
        }}
      />

      {/* Appointment dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div> Book Appointment</div>
            <IconButton onClick={handleClose}>X</IconButton>
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
                        disabled={!isEditable}
                      >
                        {patients?.map((p, index) => (
                          <MenuItem
                            key={index}
                            value={`${p.lastName} ${p.firstName}`}
                          >
                            {p.lastName} {p.firstName}
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
                      <Select
                        {...field}
                        labelId="doctor-label"
                        label="Doctor"
                        disabled={!isEditable}
                      >
                        {doctors.map((d, index) => (
                          <MenuItem
                            key={d.id}
                            value={`${d.lastName} ${d.firstName}`}
                          >
                            {d.lastName} {d.firstName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.doctor?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2}>
                  {/* Start Time */}
                  <Grid item xs={6}>
                    <Controller
                      name="startTime"
                      control={control}
                      rules={{ required: "Start time is required" }}
                      render={({ field }) => (
                        <TimePicker
                          {...field}
                          label="Start Time"
                          disabled={!isEditable}
                          ampm
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.startTime,
                              helperText: errors.startTime?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* End Time */}
                  <Grid item xs={6}>
                    <Controller
                      name="endTime"
                      control={control}
                      rules={{ required: "End time is required" }}
                      render={({ field }) => (
                        <TimePicker
                          {...field}
                          label="End Time"
                          ampm
                          disabled={!isEditable}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.endTime,
                              helperText: errors.endTime?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>

              {selectedEvent?.extendedProps.status === "Cancelled" && (
                <Grid item size={{ xs: 12 }}>
                  {/* <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field} 
                        label="Cancel Reason"
                        fullWidth
                        multiline
                        rows={2}
                        disabled 
                      />
                    )}
                  /> */}
                  <Typography color="warning">
                    Reason : {selectedEvent?.extendedProps.reason}
                  </Typography>
                </Grid>
              )}

              <Grid container>
                <Grid item size={{ xs: 6 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isEditable}
                  >
                    {isEditMode ? "Update" : "Add"}
                  </Button>
                </Grid>

                {isEditMode && (
                  <Grid item size={{ xs: 6 }}>
                    <Button
                      variant="outlined"
                      //color="error"
                      fullWidth
                      onClick={handleDelete}
                      disabled={!isEditable}
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
