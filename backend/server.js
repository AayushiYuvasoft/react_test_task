const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userDataRoutes = require("./routes/userDataRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  console.log(req.method);
  next();
});



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log("connected to db & listening on port", 8000);
    });
  })
  .catch((err) => {});

app.use("/api/user", userRoutes);
app.use("/api/userData", userDataRoutes);
