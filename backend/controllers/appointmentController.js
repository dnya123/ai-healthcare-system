const Appointment = require("../models/Appointment");

// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const {
      doctorName,
      appointmentDate,
      timeSlot,
      symptoms,
    } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctorName,
      appointmentDate,
      timeSlot,
      symptoms,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY APPOINTMENTS
const getMyAppointments = async (req, res) => {
  try {

    console.log("Logged in user:", req.user.id);

    const appointments = await Appointment.find({
      patient: req.user.id,
    }).sort({
      createdAt: -1,
    });

    console.log("Appointments:", appointments);

    res.status(200).json(appointments);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS
const updateAppointmentStatus = async (req, res) => {
  try {

    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = req.body.status;

    await appointment.save();

    res.status(200).json({
      message: "Appointment updated",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};