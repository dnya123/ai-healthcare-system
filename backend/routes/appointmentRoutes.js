const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
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
  "/all",
  protect,
  authorizeRoles("doctor"),
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

module.exports = router;