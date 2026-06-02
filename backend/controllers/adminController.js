const User = require("../models/User");
const Appointment = require("../models/Appointment");

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();

    const doctors =
      await User.countDocuments({
        role: "doctor",
      });

    const appointments =
      await Appointment.countDocuments();

    res.status(200).json({
      users,
      doctors,
      appointments,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Users
const getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find()
      .select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (
  req,
  res
) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Appointments
const getAllAppointments =
  async (req, res) => {

    try {

      const appointments =
        await Appointment.find()
        .populate(
          "patient",
          "name email"
        );

      res.status(200).json(
        appointments
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

// Delete Appointment
const deleteAppointment =
  async (req, res) => {

    try {

      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Appointment deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllAppointments,
  deleteAppointment,
};