import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  return (
    <Autocomplete
      freeSolo
      options={menuItems}
      getOptionLabel={(option) => option.label}
      inputValue={searchValue}
      onInputChange={(e, newValue) => setSearchValue(newValue)}
      onChange={(e, value) => {
        if (value) navigate(value.path);
        
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search menu..."
          variant="outlined"
          sx={{  borderRadius: 3 }}
        />
      )}
      sx={{ width: "100%" }}
    />
  );
};

export default SearchBar;
