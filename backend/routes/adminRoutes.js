const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUser,
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
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

router.put(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
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

router.put(
  "/appointments/:id",
  protect,
  authorizeRoles("admin"),
  updateAppointment
);

module.exports = router;