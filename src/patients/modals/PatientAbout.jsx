import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  IconButton,
  Divider,
  Card,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "../../hooks/useToast";
import { phoneTypes, statusP } from "../../utils/constans";
import { getAge, isAdult } from "../../utils/validations";
import { getItem, setItem } from "../../utils/localStorageUtils";




// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  patientStatus: yup.string().required("Status is required"),
  dob: yup
    .string()
    .required("DOB is required")
    .test("age", "Patient must be at least 18 years old", (value) =>
      isAdult(value, 18)
    ),
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .required("Phone no is required")
          .matches(/^\d{10}$/, "Enter a valid 10-digit number"),
        type: yup.string().required("Type is required"),
      })
    )
    .min(1, "At least one phone number is required"),
  bmi: yup
    .number()
    .typeError("BMI must be a number")
    .required("BMI is required"),
  height: yup
    .number()
    .typeError("Height must be a number")
    .required("Height is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required"),
});

const PatientAbout = ({ open, handleClose, id, setAboutUpdate }) => {
  const theme = useTheme();

  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 800 },
  bgcolor: theme.palette.background.paper,
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  maxHeight: "90vh",
  overflowY: "auto",
};

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      patientStatus: "",
      dob: "",
      age: "",
      contacts: [{ number: "", type: "" }],
      bmi: "",
      height: "",
      weight: "",
    },
  });

  const { showToast } = useToast();
  const formValues = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {
    if (!id) return;
    const existingPatients = getItem("patients");
    const patientData = existingPatients.find(
      (p) => String(p.id) === String(id)
    );
    console.log(patientData);

    const formattedDob = patientData?.dob
      ? new Date(patientData.dob).toISOString().split("T")[0]
      : "";
    const prefillData = {
      ...patientData,
      dob: formattedDob,
      age: getAge(formattedDob),
    };
    reset(prefillData);
  }, [id, open, reset]);

  const onSubmit = (data) => {
    const existing = getItem("patients") || [];
    const index = existing.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return;

    const updatedEntry = { ...existing[index], ...data };
    existing[index] = updatedEntry;
    setItem("patients", existing);
    setAboutUpdate(updatedEntry);
    showToast("Updated Successfully", "success");
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            color="theme.palette.common.white"
          >
            Edit Patient Info
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* LEFT COLUMN */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="First Name"
                  value={formValues.firstName}
                  onChange={(e) =>
                    setValue("firstName", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                />

                <TextField
                  label="Last Name"
                  value={formValues.lastName}
                  onChange={(e) =>
                    setValue("lastName", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                />

                <Controller
                  name="patientStatus"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.patientStatus}>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Patient Status">
                        {statusP.map((s, i) => (
                          <MenuItem key={i} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.patientStatus?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <TextField
                  label="DOB"
                  type="date"
                  value={formValues.dob}
                  onChange={(e) => {
                    const dobString = e.target.value;
                    setValue("dob", dobString, { shouldValidate: true });
                    setValue("age", getAge(dobString));
                  }}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />

                <Box
                  sx={{
                   
                  }}
                >
                  <Typography
                    variant="body1"
                    color=" theme.palette.text.primary"
                  >
                    Age: <strong>{formValues?.age || "--"} years</strong>
                  </Typography>
                </Box>

                <TextField
                  label="BMI"
                  value={formValues.bmi}
                  onChange={(e) =>
                    setValue("bmi", e.target.value, { shouldValidate: true })
                  }
                  error={!!errors.bmi}
                  helperText={errors.bmi?.message}
                  fullWidth
                />
              </Stack>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item size={{ xs: 12, md: 6 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Height (cm)"
                  value={formValues.height}
                  onChange={(e) =>
                    setValue("height", e.target.value, { shouldValidate: true })
                  }
                  error={!!errors.height}
                  helperText={errors.height?.message}
                  fullWidth
                />

                <TextField
                  label="Weight (kg)"
                  value={formValues.weight}
                  onChange={(e) =>
                    setValue("weight", e.target.value, { shouldValidate: true })
                  }
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                  fullWidth
                />

                {/* Contacts Section */}
                <Card
                 
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography fontWeight={600}>Contacts</Typography>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => append({ number: "", type: "" })}
                       
                        variant="outlined"
                      >
                        Add
                      </Button>
                    </Box>

                    {fields?.map((item, index) => (
                      <Grid
                        container
                        spacing={1.5}
                        key={item.id}
                        alignItems="center"
                        mb={1}
                      >
                        <Grid item size={{ xs: 7 }}>
                          <TextField
                            label={`Phone #${index + 1}`}
                            fullWidth
                            value={formValues.contacts?.[index]?.number}
                            onChange={(e) =>
                              setValue(
                                `contacts.${index}.number`,
                                e.target.value,
                                {
                                  shouldValidate: true,
                                }
                              )
                            }
                            error={!!errors.contacts?.[index]?.number}
                            helperText={
                              errors.contacts?.[index]?.number?.message
                            }
                            
                          />
                        </Grid>
                        <Grid item size={{ xs: 4 }}>
                          <Controller
                            name={`contacts.${index}.type`}
                            control={control}
                            defaultValue={
                              formValues.contacts?.[index]?.type || ""
                            }
                            render={({ field }) => (
                              <FormControl
                                fullWidth
                                error={!!errors.contacts?.[index]?.type}
                                
                              >
                                <InputLabel>Type</InputLabel>
                                <Select {...field} label="Type">
                                  {phoneTypes.map((t, i) => (
                                    <MenuItem key={i} value={t}>
                                      {t}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <FormHelperText>
                                  {errors.contacts?.[index]?.type?.message}
                                </FormHelperText>
                              </FormControl>
                            )}
                          />
                        </Grid>
                        <Grid item size={{ xs: 1 }}>
                          <IconButton
                            color="error"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          {/* Actions */}

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="outlined"
               
              type="submit"
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
               
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PatientAbout;
