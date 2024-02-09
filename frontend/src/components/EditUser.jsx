import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchPost } from "../redux/DataSlice";
import { useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location = useLocation();
    const  users  = location.state.user;
  console.log(users)

  
  const [addUser, setNewUser] = useState({
    name: users.name || "",
    email:users.email || "",
    phone: users.phone || "",
    gender:users.gender || "",
  });
  const hanldeChange = (e) => {
    setNewUser({ ...addUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataas = {
        _id:users?._id,
        name: addUser.name,
        email: addUser.email,
        gender: addUser.gender,
        phone: addUser.phone,
      };
      const response = await api.put("/api/userData/editUser", dataas);
      console.log(response.data);
      toast.success("Updated Sucessfullys")
      navigate("/list")
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
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={addUser.email}
          />
          <TextField
            id="phone"
            name="phone"
            label="phone"
            variant="outlined"
            margin="normal"
            onChange={hanldeChange}
            value={addUser.phone}
          />
          <FormControl>
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

export default EditUser;
