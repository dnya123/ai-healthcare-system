const express = require("express");

const {
  getCurrentUser,
  adminDashboard,
  doctorDashboard,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getCurrentUser);

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  adminDashboard
);

router.get(
  "/doctor",
  protect,
  authorizeRoles("doctor"),
  doctorDashboard
);

module.exports = router;