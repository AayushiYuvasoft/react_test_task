import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import AddUserInfo from "./components/AddUserInfo";
import ListingOfUser from "./components/ListingOfUser";
import EditUser from "./components/EditUser";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<Form />} />
        <Route path="/add-user" element={<AddUserInfo />} />
        <Route path="/list" element={<ListingOfUser />} />
        <Route path="/edit" element={<EditUser />} />

      </Routes>

    </BrowserRouter>
  );
};

export default Routing;
