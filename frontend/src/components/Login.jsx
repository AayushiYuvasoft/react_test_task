import { Button, Container, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loginApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {fetchPost} from "../redux/DataSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const hanldeChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginApi.post("/api/user/loginUser", {
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/add");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container>
      <Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={loginData.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={loginData.password}
          />
          <Button
            variant="contained"
            style={{ marginTop: "25px" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
