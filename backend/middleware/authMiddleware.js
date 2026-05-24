const jwt = require("jsonwebtoken");


// PROTECT ROUTES
const protect = async (
  req,
  res,
  next
) => {

  // GET TOKEN FROM COOKIE
  const token = req.cookies.token;

  // CHECK TOKEN
  if (!token) {

    return res.status(401).json({
      message:
        "Not authorized, no token",
    });
  }

  try {

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};


// ROLE AUTHORIZATION
const authorizeRoles =
  (...roles) => {

    return (req, res, next) => {

      if (
        !roles.includes(req.user.role)
      ) {

        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      next();
    };
  };


module.exports = {
  protect,
  authorizeRoles,
};