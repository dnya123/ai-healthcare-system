const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

const adminDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
};

const doctorDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome Doctor",
  });
};

module.exports = {
  getCurrentUser,
  adminDashboard,
  doctorDashboard,
};