const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getStudentDashboard,
  getStudentBookings,
} = require("../controllers/studentController");

/**
 * Student dashboard summary
 */
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getStudentDashboard
);

/**
 * Student booking history
 */
router.get(
  "/bookings",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getStudentBookings
);

module.exports = router;
