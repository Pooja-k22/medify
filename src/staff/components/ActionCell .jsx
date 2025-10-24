import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getItem, setItem } from "../../utils/localStorageUtils";

import CancelDialog from "./CancelDialog";

const ActionCell = ({ row, doctorId, setAppointments }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const status = row.original.extendedProps.status;
  const appointmentId = row.original.id;

  const handleStatusChange = (newStatus, reason = "") => {
    const allAppointments = getItem("appointments") ;
    const updated = allAppointments.map((a) =>
      a.id === appointmentId
        ? { 
            ...a, 
            extendedProps: { 
              ...a.extendedProps, 
              status: newStatus, 
              ...(reason && { reason }) 
            } 
          }
        : a
    );
    setItem("appointments", updated);
    setAppointments(updated.filter((a) => a.extendedProps?.doctorId === Number(doctorId)));
  };

  const handleCancelSubmit = (reason) => {
    handleStatusChange("Cancelled", reason);
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      {status !== 'Cancelled' && <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        
        {status !== "Cancelled" && status !== "Approved" && (
          <MenuItem
            onClick={() => {
              handleStatusChange("Approved");
              setAnchorEl(null);
            }}
          >
            Approve
          </MenuItem>
        )}

       

       
        {status !== "Cancelled" && (
          <MenuItem
            onClick={() => {
              setOpenDialog(true);
              setAnchorEl(null);
            }}
          >
            Cancel
          </MenuItem>
        )}
      </Menu>}

      <CancelDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleCancelSubmit}
      />
    </>
  );
};

export default ActionCell;
