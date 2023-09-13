import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";
import "./Alert.css";
const Error = ({ message }) => {
  return (
    <Box className="error" color="#d20f46">
      <Box className="message">
        <Typography fontWeight="400" fontSize={"16px"}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Error;
