import React from "react";
import { Box, Grid } from "@mui/material";
import PersonalInfoCard from "./PersonalInfoCard";
import AddressInfoCard from "./AddressInfoCard";
import GeneralInfoCard from "./GeneralInfoCard";

export default function PatientProfileTab({id}) {
  return (
    <Grid container spacing={2}>
      <Grid item size={{xs:12}}>
        <PersonalInfoCard  id={id}/>
      </Grid>
      <Grid item size={{xs:12,}}>
        <AddressInfoCard id={id} />
      </Grid>
      <Grid item size={{xs:12,}}>
        <GeneralInfoCard id={id}/>
      </Grid>
    </Grid>
  );
}
