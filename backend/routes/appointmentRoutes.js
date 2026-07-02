const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  updateAppointment,
} = require("../controllers/appointmentController");

const {
  protect,
  authorizeRoles,
} = require(
  "../middleware/authMiddleware"
);


// CREATE APPOINTMENT
router.post(
  "/",
  protect,
  createAppointment
);


// GET MY APPOINTMENTS
router.get(
  "/my",
  protect,
  getMyAppointments
);

router.get(
  "/doctor",
  protect,
  getDoctorAppointments
);

router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  getAllAppointments
);

router.put(
  "/status/:id",
  protect,
  authorizeRoles("doctor"),
  updateAppointmentStatus
);

// cancel APPOINTMENTS
router.put(
  "/cancel/:id",
  protect,
  cancelAppointment
);

router.put(
  "/update/:id",
  protect,
  updateAppointment
);

module.exports = router;