const userData = require("../model/userDataModel");

const addUser = async (req, res, next) => {
  const userDetail = req.body;
  console.log(userDetail);
  try {
    const data = await userData.create({ ...userDetail });
    const { name, email, phone, gender } = data;
    console.log(data);
    res.status(200).json({
      status: "success",
      message: "Successfully created User",
      data: { name, email, phone, gender},
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  console.log("param", req.params.id);
  try {
    const data = await userData.findByIdAndRemove(id);
    res.status(200).json({
      status: "success",
      message: "Successfully Deleted User",
      data: data,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};

const editUser = async (req, res, next) => {
  const user = req.body;
  try {
    await userData.findByIdAndUpdate(user._id, { ...req.body });
    const data = await userData.findById(user._id);
    const { name, email, phone, gender } = data;
    res.status(200).json({
      status: "success",
      message: "Successfully Updated User",
      data: { name, email, phone, gender },
    });
  } catch (err) {
    next(err);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const data = await userData.find();
    if (!data) {
      throw Error("Not found");
    }
    res.status(200).json({
      status: "success",
      message: "Successfully Retrived All User",
      data: data,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports = { addUser, deleteUser, editUser, getAllUsers };
