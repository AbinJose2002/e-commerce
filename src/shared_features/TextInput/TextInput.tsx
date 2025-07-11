import { InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

type Props = {
    label?: string
    icon: React.ReactNode
}

const TextInput = (props: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const SearchBar = (
    <TextField
      id="search-bar"
      label={props.label}
      variant="outlined"
      sx={{
        mx: isMobile ? 2 : 0,
        mt: isMobile ? 2 : 0,
        width: isMobile ? "100%" : "300px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          height: "50px",
          backgroundColor: 'white'
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.icon}
          </InputAdornment>
        ),
      }}
    />
  );
  return SearchBar;
};

export default TextInput;
