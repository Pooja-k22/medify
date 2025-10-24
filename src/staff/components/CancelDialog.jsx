import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { cancelSchema } from "../../utils/yupValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function CancelDialog({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cancelSchema),
    defaultValues: { reason: "" },
  });

  const reasonValue = watch("reason");

  const handleCancelSubmit = (data) => {
    onSubmit(data.reason);
    reset();
    onClose();
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };
  return (
    <>
      {/* Cancel Reason Dialog */}
      <Dialog open={open} onClose={handleClose} sx={{ p: 2 }}>
        {/* <DialogTitle>Cancel Appointment</DialogTitle> */}
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <CancelIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h6" color="warning">
              {" "}
              Are you sure you want to cancel appointment !!
            </Typography>
          </Box>

          <TextField
            autoFocus
            margin="dense"
            label="Reason for cancellation"
            type="text"
            fullWidth
            value={reasonValue}
            error={!!errors.reason}
            helperText={errors.reason?.message}
            onChange={(e) =>
              setValue("reason", e.target.value, { shouldValidate: true })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="warning">
            Close
          </Button>
          <Button
            onClick={handleSubmit(handleCancelSubmit)}
            color="warning"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CancelDialog;
