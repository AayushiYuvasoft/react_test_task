import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchPost } from "../redux/DataSlice";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ListingOfUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  const { datass } = useSelector((state) => state.datas);
console.log(datass ,"datass")
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch ,reload]);

  const handleDelete = async (id) => {
    dispatch(deleteUser(id));
    setReload(!reload); 
  };

  const handleEdit = (user) => {
    navigate("/edit", { state: { user } });
  };


  return (
    <Container>
      <Stack>
        <Button
          variant="contained"
          style={{ marginTop: "25px" }}
          onClick={() => {
            navigate("/add-user");
          }}
        >
          Add Users
        </Button>
      </Stack>
      <Stack>
      {datass.length > 0 ? (
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
                {datass.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon onClick={() => handleDelete(row?._id)} />{" "}
                      <EditIcon onClick={() => handleEdit(row)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>Loading...</div>
        )}
      </Stack>
    </Container>
  );
};

export default ListingOfUser;
