const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {

  try {

    const appointment =
      await Appointment.create({
        patient: req.user.id,
        doctorName: req.body.doctorName,
        appointmentDate:
          req.body.appointmentDate,
        timeSlot: req.body.timeSlot,
      });

    res.status(201).json({
      message:
        "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

const getAppointments = async (
  req,
  res
) => {

  try {

    const appointments =
      await Appointment.find();

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};