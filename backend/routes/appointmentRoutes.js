const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
} = require(
  "../controllers/appointmentController"
);

const {
  protect,
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

// cancel APPOINTMENTS
router.put(
  "/cancel/:id",
  protect,
  cancelAppointment
);

module.exports = router;