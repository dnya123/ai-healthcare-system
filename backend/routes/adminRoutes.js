const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllAppointments,
  deleteAppointment,
} = require(
  "../controllers/adminController"
);

const {
  protect,
  authorizeRoles,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

router.get(
  "/appointments",
  protect,
  authorizeRoles("admin"),
  getAllAppointments
);

router.delete(
  "/appointments/:id",
  protect,
  authorizeRoles("admin"),
  deleteAppointment
);

module.exports = router;