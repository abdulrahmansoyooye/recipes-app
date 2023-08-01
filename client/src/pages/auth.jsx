import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
const Login = () => {
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  const [_, setCookies] = useCookies(["access_token"]);
  const { username, password } = userData;
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userID);
      alert("Logged In");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth-container">
      <Form
        username={username}
        password={password}
        userData={userData}
        setuserData={setuserData}
        label="Login"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Register = () => {
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userData;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth-container">
      <Form
        username={username}
        password={password}
        userData={userData}
        label="Register"
        setuserData={setuserData}
        onSubmit={onSubmit}
      />
    </div>
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
  return (
    <form onSubmit={onSubmit}>
      <h2> {label} </h2>
      <div className="form-group">
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          onChange={(e) => {
            setuserData({ ...userData, username: e.target.value });
          }}
          value={username}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setuserData({ ...userData, password: e.target.value });
          }}
        />
      </div>
      <button type="submit"> {label} </button>
    </form>
  );
};
export default Auth;
