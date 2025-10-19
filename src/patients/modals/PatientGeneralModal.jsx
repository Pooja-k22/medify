import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { trialStite } from "../../utils/constans";
import { getItem, setItem } from "../../utils/localStorageUtils";
import { useToast } from "../../hooks/useToast";
// import { getCommonFieldTheme, getSelectThemeDropDown } from "../../theme/themeStyle";



function PatientGeneralModal({ open, handleClose, id, setGeneralInfoUpdate }) {
const theme = useTheme();

  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 500 },
  bgcolor:  theme.palette.background.paper,
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
  // Validation
  const schema = yup.object().shape({
    site: yup.string().required("Site is required"),
    nickname: yup.string().required("Nickname is required"),
    priorLastName: yup.string().required("Prior Last Name is required"),
    ssn: yup.string().required("SSN is required"),
    source: yup.string().required("Source is required"),
    pcpDoctors: yup.string().required("PCP Doctors is required"),
  });

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      site: "",
      nickname: "",
      priorLastName: "",
      ssn: "",
      source: "",
      pcpDoctors: "",
    },
  });

  const formValues = watch();
  // custome hook
  const { showToast } = useToast();
  // Prefill data
  useEffect(() => {
    if (!id) return;

    const allGeneral = getItem("patients") || [];
    const patientData = allGeneral.find((p) => String(p.id) === String(id));

    if (patientData) {
      reset(patientData)
    }
  }, [id, setValue, open]);

  const onSubmit = (data) => {
    if (!id) return console.log("ID is missing");

    const patients = getItem("patients") || [];
    const index = patients.findIndex((p) => String(p.id) === String(id));

    if (index !== -1) {
      // Merge general info into existing patient object
      patients[index] = { ...patients[index], ...data };
    } else {
      patients.push({ id, ...data });
    }

    setItem("patients", patients);
    setGeneralInfoUpdate({ id, ...data });
    showToast("Updated Successfully", "success");
    handleClose();
    reset();
  };

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={3} color= 'theme.palette.primary.main'>
          Edit General Info
        </Typography>
        <Stack spacing={2}>
          <Controller
            name="site"
            control={control}
            defaultValue={formValues.site || ""}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.site} 
            
              >
                <InputLabel>Site</InputLabel>
                <Select {...field} label="Site" 
                
                >
                  {trialStite.map((site, index) => (
                    <MenuItem key={index} value={site}>
                      {site}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.site?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <TextField
            label="Nickname"
            value={formValues.nickname}
            onChange={(e) =>
              setValue("nickname", e.target.value, { shouldValidate: true })
            }
            error={!!errors.nickname}
            helperText={errors.nickname?.message}
            fullWidth
           
          />
          <TextField
            label="Prior Last Name"
            value={formValues.priorLastName}
            onChange={(e) =>
              setValue("priorLastName", e.target.value, {
                shouldValidate: true,
              })
            }
            error={!!errors.priorLastName}
            helperText={errors.priorLastName?.message}
            fullWidth
           
          />
          <TextField
            label="SSN"
            value={formValues.ssn}
            onChange={(e) =>
              setValue("ssn", e.target.value, { shouldValidate: true })
            }
            error={!!errors.ssn}
            helperText={errors.ssn?.message}
            fullWidth
           
          />
          <TextField
            label="Source"
            value={formValues.source}
            onChange={(e) =>
              setValue("source", e.target.value, { shouldValidate: true })
            }
            error={!!errors.source}
            helperText={errors.source?.message}
            fullWidth
          
          />
          <TextField
            label="PCP Doctors"
            value={formValues.pcpDoctors}
            onChange={(e) =>
              setValue("pcpDoctors", e.target.value, { shouldValidate: true })
            }
            error={!!errors.pcpDoctors}
            helperText={errors.pcpDoctors?.message}
            fullWidth
            
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
             
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleModalClose} >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}

export default PatientGeneralModal;
