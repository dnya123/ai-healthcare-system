const Appointment = require("../models/Appointment");


// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      appointmentDate,
      timeSlot,
      symptoms,
    } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
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
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY APPOINTMENTS
const getMyAppointments = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalAppointments = await Appointment.countDocuments({
      patient: req.user.id,
    });

    const appointments = await Appointment.find({
    patient:req.user.id
})
.populate("doctor","name email")
.sort({createdAt:-1})
.skip(skip)
.limit(limit);
      

    res.status(200).json({
      appointments,
      currentPage: page,
      totalPages: Math.ceil(totalAppointments / limit),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// get Doctor Appointments

const getDoctorAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      doctor:req.user._id,
    })
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate("patient","name email")
      .populate("doctor","name email")
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

const updateAppointment = async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (
      appointment.status !== "pending"
    ) {
      return res.status(400).json({
        message:
          "Only pending appointments can be edited",
      });
    }

    appointment.doctor =
      req.body.doctor;

    appointment.appointmentDate =
      req.body.appointmentDate;

    appointment.timeSlot =
      req.body.timeSlot;

    await appointment.save();

    res.json({
      message:
        "Appointment updated successfully",
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
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  updateAppointment,
};