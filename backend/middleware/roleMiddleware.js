const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }

    // Allow requiredRole to be a string (single role) or an array of roles
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }
    } else {
      if (req.user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }
    }

    next();
  };
};

module.exports = roleMiddleware;
