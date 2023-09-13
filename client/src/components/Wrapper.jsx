import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const Wrapper = styled(Box)(({ mobileScreens, theme }) => ({
  width: mobileScreens ? "93%" : "50%",
  padding: "3rem",
  borderRadius: "1rem",
  background: theme.palette.background.alt,
  margin: "2.5rem auto",
  color: "#FFFFF",
}));

export default Wrapper;
