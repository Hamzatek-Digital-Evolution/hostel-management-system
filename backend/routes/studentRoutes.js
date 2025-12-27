const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getStudentDashboard,
  getStudentBookings,
  getEligibleHostelsForPayment,
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

//get eligible hostels
router.get(
  "/eligible-hostels",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getEligibleHostelsForPayment
);

module.exports = router;
