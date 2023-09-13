import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteOutlineOutlined, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import AlertPage from "../components/Alert/AlertPage";
import { Alert } from "@mui/joy";
import Error from "../components/Alert/Error";
const Auth = () => {
  const [pageType, setPageType] = useState("login");
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const [_, setCookies] = useCookies(["access_token"]);
  const { username, password } = userData;
  const navigate = useNavigate();
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const theme = useTheme();
  const login = async (e) => {
    e.preventDefault();
    setuserData({
      username: "",
      password: "",
    });
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userID);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);

        navigate("/");
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.log(err);
    }
  };
  const register = async (e) => {
    e.preventDefault();
    setuserData({
      username: "",
      password: "",
    });

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      setTimeout(() => {
        setAlert(false);

        setPageType("login");
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);

      console.error(err);
      // setPageType("login");
    }
  };
  const onSubmit = async (e) => {
    if (pageType === "login") {
      login(e);
    } else {
      register(e);
    }
  };

  return (
    <Box
      className="auth"
      sx={{
        width: mobileScreens ? "93%" : "50%",
        padding: "5rem 3rem",
        borderRadius: "1rem",
        background: theme.palette.background.alt,
        margin: "2.5rem auto",
        color: "#FFFFF",
      }}
    >
      {pageType === "login" ? (
        <Box>
          {alert && <AlertPage message="You're logged In" />}

          <Form
            username={username}
            password={password}
            userData={userData}
            setuserData={setuserData}
            label="Sign In"
            onSubmit={onSubmit}
          />
          <Typography
            sx={{
              textAlign: "center",
              m: "2rem auto",
              textDecoration: "underline",
            }}
            onClick={() => {
              setPageType("register");
            }}
          >
            Don't have an account?Sign Up here.
          </Typography>
          {error && <Error message="There was an error. Please try again" />}
        </Box>
      ) : (
        <Box>
          {alert && <AlertPage message="You're Registered" />}

          <Form
            username={username}
            password={password}
            userData={userData}
            label="Register"
            setuserData={setuserData}
            onSubmit={onSubmit}
          />
          <Typography
            sx={{
              m: "2rem auto",
              textDecoration: "underline",
              textAlign: "center",
            }}
            onClick={() => {
              setPageType("login");
            }}
          >
            Already have an account?Sign In here.
          </Typography>
          {error && (
            <Error message="There was an error. Use a different Username" />
          )}
        </Box>
      )}
    </Box>
  );
};

const Form = ({
  username,
  password,
  userData,
  setuserData,
  label,
  onSubmit,
}) => {
  const mobileScreens = useMediaQuery("(max-width:1000px)");
  return (
    <form onSubmit={onSubmit}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          m: "1rem auto",
          fontWeight: "500",
        }}
      >
        {label}
      </Typography>
      <Box
        className="form-group"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRow: "2fr",
          gridGap: "1rem",
        }}
      >
        <TextField
          sx={{
            gridColumn: mobileScreens ? "1/ span 2" : "1",
          }}
          label="Username"
          type="text"
          onChange={(e) => {
            setuserData({ ...userData, username: e.target.value });
          }}
          value={username}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setuserData({ ...userData, password: e.target.value });
          }}
          sx={{
            gridColumn: mobileScreens ? "1/ span 2" : "2",
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            gridColumn: "1/ span 2",
            mt: "1rem",
          }}
        >
          {label}
        </Button>
      </Box>
    </form>
  );
};

// const Login = () => {
//   const [userData, setuserData] = useState({
//     username: "",
//     password: "",
//   });
//   const [_, setCookies] = useCookies(["access_token"]);
//   const { username, password } = userData;
//   const navigate = useNavigate();
//   const mobileScreens = useMediaQuery("(max-width:800px)");
//   const theme = useTheme();
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/auth/login", {
//         username,
//         password,
//       });

//       setCookies("access_token", response.data.token);
//       window.localStorage.setItem("userId", response.data.userID);
//       alert("Logged In");
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <Box
//       sx={{
//         width: mobileScreens ? "93%" : "50%",
//         padding: "5rem 3rem",
//         borderRadius: "1rem",
//         background: theme.palette.background.alt,
//         margin: "2.5rem auto",
//         color: "#FFFFF",
//       }}
//     >
//       <Form
//         username={username}
//         password={password}
//         userData={userData}
//         setuserData={setuserData}
//         label="Login"
//         onSubmit={onSubmit}
//       />
//     </Box>
//   );
// };
// // Register
// const Register = ({ setPageType }) => {
//   const [userData, setuserData] = useState({
//     username: "",
//     password: "",
//   });
//   const { username, password } = userData;
//   const theme = useTheme();
//   const mobileScreens = useMediaQuery("(max-width:1000px)");
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/auth/register", {
//         username,
//         password,
//       });
//       alert("Registration Completed");
//       setPageType("login");
//     } catch (err) {
//       console.error(err);
//       setPageType("login");
//     }
//   };
//   return (
//     <Box
//       sx={{
//         width: mobileScreens ? "93%" : "50%",
//         padding: "5rem 3rem",
//         borderRadius: "1rem",
//         background: theme.palette.background.alt,
//         margin: "2.5rem auto",
//       }}
//     >
//       <Form
//         username={username}
//         password={password}
//         userData={userData}
//         label="Register"
//         setuserData={setuserData}
//         onSubmit={onSubmit}
//       />
//     </Box>
//   );
// };

// const Form = ({
//   username,
//   password,
//   userData,
//   setuserData,
//   label,
//   onSubmit,
// }) => {
//   const mobileScreens = useMediaQuery("(max-width:1000px)");
//   return (
//     <form onSubmit={onSubmit}>
//       <Typography variant="h4"> {label} </Typography>
//       <Box
//         className="form-group"
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gridTemplateRow: "2fr",
//           gridGap: "1rem",
//         }}
//       >
//         <TextField
//           sx={{
//             gridColumn: mobileScreens ? "1/ span 2" : "1",
//           }}
//           label="Username"
//           type="text"
//           onChange={(e) => {
//             setuserData({ ...userData, username: e.target.value });
//           }}
//           value={username}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => {
//             setuserData({ ...userData, password: e.target.value });
//           }}
//           sx={{
//             gridColumn: mobileScreens ? "1/ span 2" : "2",
//           }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{
//             width: "100%",
//             gridColumn: "1/ span 2",
//           }}
//         >
//           {label}
//         </Button>
//       </Box>
//     </form>
//   );
// };
export default Auth;
