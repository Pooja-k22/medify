import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { format, isSameDay } from "date-fns";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    time: "",
  });

  const handleAdd = () => {
    if (formData.doctor && formData.patient && formData.time && selectedDate) {
      setAppointments([
        ...appointments,
        {
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
        },
      ]);
      setFormData({ doctor: "", patient: "", time: "" });
    }
  };

  const appointmentsForSelectedDate = appointments.filter((a) =>
    selectedDate ? a.date === format(selectedDate, "yyyy-MM-dd") : false
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={4} sx={{ p: 4 }}>
        {/* Left Side Form */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Make an Appointment
          </Typography>

          <TextField
            label="Doctor Name"
            fullWidth
            margin="normal"
            value={formData.doctor}
            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
          />
          <TextField
            label="Patient Name"
            fullWidth
            margin="normal"
            value={formData.patient}
            onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAdd}
          >
            Book Appointment
          </Button>
        </Grid>

        {/* Right Side Calendar */}
        <Grid item xs={12} md={8}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slots={{
              day: (props) => {
                const hasAppointment = appointments.some((a) =>
                  isSameDay(new Date(a.date), props.day)
                );
                return (
                  <PickersDay
                    {...props}
                    sx={{
                      backgroundColor: hasAppointment ? "#7b68ee" : "transparent",
                      color: hasAppointment ? "white" : "inherit",
                      borderRadius: "50%",
                    }}
                  />
                );
              },
            }}
          />

          {/* Appointment List */}
          {selectedDate && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  Appointments on {format(selectedDate, "dd MMM yyyy")}
                </Typography>
                <List>
                  {appointmentsForSelectedDate.length > 0 ? (
                    appointmentsForSelectedDate.map((a, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={`${a.time} - ${a.patient}`}
                          secondary={`Doctor: ${a.doctor}`}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No appointments</Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default Appointments;
