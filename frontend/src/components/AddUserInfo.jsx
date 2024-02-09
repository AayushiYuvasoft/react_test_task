import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addDatas } from "../redux/DataSlice";
import { useNavigate } from "react-router-dom";

const AddUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const hanldeChange = (e) => {
    setNewUser({ ...addUser, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  let namePattern = /a/;

  const handleSubmit = async (e) => {
    let formIsValid = true;
    const newErrors = {};

    if (!addUser.name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    } else if (addUser.name.trim().length < 4) {
      newErrors.name = "Name must be at least 4 characters";
      formIsValid = false;
    }

    if (!addUser.email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (addUser.email.trim().includes(`/@/`)) {
      newErrors.email = "Email Must be in Valid fromat";
      formIsValid = false;
    }

    if (!addUser.phone.trim()) {
      newErrors.phone = "Phone is required";
      formIsValid = false;
    } else if (addUser.phone.trim().length < 10) {
      newErrors.email = "Number should be in 10 digit";
      formIsValid = false;
    }

    if (!addUser.gender.trim()) {
      newErrors.gender = "Gender is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    e.preventDefault();

    try {
      const dataas = {
        name: addUser.name,
        email: addUser.email,
        gender: addUser.gender,
        phone: addUser.phone,
      };
      console.log(dataas);
      dispatch(addDatas(dataas));
      toast.success("Added Sucessfully");
      navigate("/list");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container>
      <Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={addUser.name}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={addUser.email}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            id="phone"
            name="phone"
            label="phone"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={addUser.phone}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <FormControl error={!!errors.gender}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="gender"
              value={addUser.gender}
              onChange={hanldeChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
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

export default AddUserInfo;
