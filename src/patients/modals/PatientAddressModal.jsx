import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getItem, setItem } from "../../utils/localStorageUtils";
// import { getCommonFieldTheme } from "../../theme/themeStyle";
import { useToast } from "../../hooks/useToast";



const PatientAddressModal = ({ open, handleClose, id,setAddressUpdate  }) => {
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
  // hook
  const {showToast}= useToast()

  // validation schema
  const schema = yup.object().shape({
    address1: yup.string().required("Address is required"),
    address2: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postalCode: yup
      .number()
      .typeError("It should be a number")
      .required("Postal code is required"),
  });

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
    },
  });

  const formValues = watch();

  // Prefill form if data exists
  useEffect(() => {
    if (!id) return;

    const existingAddresses = getItem("patients") || [];
    const patientData = existingAddresses.find((p) => String(p.id) === String(id));

    if (patientData) {
          reset(patientData);
}
  }, [id, setValue, open]);

  const onSubmit = (data) => {
    if (!id) return console.log("Patient ID is missing!");

    const existingPatients = getItem("patients")|| [];
    const index = existingPatients.findIndex((p) => String(p.id) === String(id));

    const updatedEntry = {
      ...existingPatients[index],
      ...data,
    };
    if (index !== -1) {
      existingPatients[index] = updatedEntry;
      
    } 
    else{
      console.log('patient not found');
      
    }

    setItem("patients", existingPatients);
    setAddressUpdate(updatedEntry);
    showToast ('Updated Successfully', "success")
    handleClose();
  };

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <Typography variant="h6" color=" theme.palette.primary.main" mb={3}>
          Edit Address Info
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Address 1"
            value={formValues.address1}
            onChange={(e) =>
              setValue("address1", e.target.value, { shouldValidate: true })
            }
            error={!!errors.address1}
            helperText={errors.address1?.message}
            fullWidth
          />
          <TextField
            label="Address 2"
            value={formValues.address2}
            onChange={(e) =>
              setValue("address2", e.target.value, { shouldValidate: true })
            }
            error={!!errors.address2}
            helperText={errors.address2?.message}
            fullWidth
          />
          <TextField
            label="City"
            value={formValues.city}
            onChange={(e) =>
              setValue("city", e.target.value, { shouldValidate: true })
            }
            error={!!errors.city}
            helperText={errors.city?.message}
            fullWidth
          />
          <TextField
            label="Postal Code"
            value={formValues.postalCode}
            onChange={(e) =>
              setValue("postalCode", e.target.value, { shouldValidate: true })
            }
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="contained"  onClick={handleSubmit(onSubmit)}  >
              Save
            </Button>
            <Button variant="outlined" onClick={handleModalClose}  >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PatientAddressModal;
