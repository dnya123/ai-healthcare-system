const express = require("express");

const {
  getCurrentUser,
  adminDashboard,
  doctorDashboard,
  updateProfile,
  changePassword,
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

router.put(
  "/profile",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.get("/test", (req, res) => {
  res.json({
    message: "User routes working",
  });
});

module.exports = router;