import { Alert, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import "./Alert.css";
const AlertPage = ({ message }) => {
  return (
    <Box className="alert">
      <Alert>
        <Typography fontWeight="400" fontSize={"17px"}>
          {message}
        </Typography>
      </Alert>
    </Box>
  );
};

export default AlertPage;
