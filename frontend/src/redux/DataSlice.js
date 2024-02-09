import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";

const fetchPost = createAsyncThunk("/", async () => {
  const response = await api.get("/api/userData/getAllUsers");
  console.log(response.data.data, "response.data");
  return response.data.data;
});

const addDatas = createAsyncThunk("/fs", async (datasss) => {
  const response = await api.post("/api/userData/addUser" ,datasss);
  console.log(response.data.data, "response.data");
  return response.data.data;
});


const editUser = createAsyncThunk("/u", async (id) => {
  const response = await api.put(`/api/userData/editUser`);
  return response.data;
});

const deleteUser = createAsyncThunk("", async (id) => {
  const response = await api.delete(`/api/userData/deleteUser/${id}`);

  return response.data;
});
const dataSlice = createSlice({
  name: "datas",
  initialState: {
    datass: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addDatas.fulfilled, (state, action) => {
      state.datass = action.payload;
    })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.datass = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.datass = state.datass.filter(user => user._id !== action.payload.data._id);
      })

      .addCase(editUser.fulfilled, (state, action) => {
        state.datass = action.payload;
      });
  },
});

export { fetchPost, deleteUser, editUser,addDatas };
export default dataSlice.reducer;
