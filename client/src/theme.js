import { createTheme } from "@mui/material";
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fca311",
          fontSize: "30px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#fca311",
      dark: "#14213d",
      light: "fca311",
    },

    background: {
      default: "#F6F6F6",
      alt: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
    fontSize: 13,
    h1: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});
export default theme;
