const bcrypt = require("bcryptjs");
const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};



const adminDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
};

const doctorDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome Doctor",
  });
};

const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCurrentUser,
  adminDashboard,
  doctorDashboard,
  updateProfile,
  changePassword,
};