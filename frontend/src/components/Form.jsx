import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { signupApi } from "../utils/api";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      formData: [],
      editingIndex: -1,
    };
  }

  hanldeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async(e) => {
    e.preventDefault();

    if (this.state.editingIndex !== -1) {
      const updatedFormData = [...this.state.formData];
      console.log(updatedFormData);
      updatedFormData[this.state.editingIndex] = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      this.setState({
        formData: updatedFormData,
        name: "",
        email: "",
        phone: "",
        editingIndex: -1,
      });
    } else {
      const response = await signupApi.post("/api/user/signupUser", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      console.log("Signup Successful:", response.data);


      this.setState((prevState) => ({
        formData: [...prevState.formData, this.state],
        name: "",
        email: "",
        password: "",
      }));
    }
  };

  handleDelete = (index) => {
    console.log(index);
    this.setState((prevState) => ({
      formData: prevState.formData.filter((_, i) => i !== index),
    }));
  };

  handleEdit = (index) => {
    const editingData = this.state.formData[index];
    console.log(editingData);
    this.setState({
      name: editingData.name,
      email: editingData.email,
      password: editingData.password,
      editingIndex: index,
    });
  };

  render() {
    return (
      <Container>
        <Stack direction="row" spacing={2} style={{ display: "flex" }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              onChange={this.hanldeChange}
              value={this.state.name}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={this.hanldeChange}
              value={this.state.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              onChange={this.hanldeChange}
              value={this.state.password}
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
        <Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.formData.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon onClick={() => this.handleDelete(index)} />{" "}
                      <EditIcon onClick={() => this.handleEdit(index)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    );
  }
}

export default Form;
