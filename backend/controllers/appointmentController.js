const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const {
      doctor,
      appointmentDate,
      timeSlot,
      symptoms,
    } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      appointmentDate,
      timeSlot,
      symptoms,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
};