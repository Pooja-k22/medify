import React from "react";
import { useMediaQuery } from "@mui/material";

const ResponsiveCalendarHeader = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  
  const headerToolbar = isMobile
    ? {
        left: "prev,next today",
        center: "",
        right: "title dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }
    : {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      };

  return headerToolbar;
};

export default ResponsiveCalendarHeader;
