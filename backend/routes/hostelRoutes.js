const express = require("express");
const router = express.Router();
const hostelController = require("../controllers/hostelController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hostelController.createHostel
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "STUDENT"]),
  hostelController.getHostels
);

// GET rooms for a hostel (student or admin)
router.get(
  "/:hostelId/rooms",
  authMiddleware,
  roleMiddleware(["ADMIN", "STUDENT"]),
  hostelController.getHostelRooms
);

module.exports = router;
