const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getAdminDashboard,
  getAllHostels,
  getAllRooms,
  getAllAllocations,
  updateHostel,
  deleteHostel,
  deleteRoom,
  createRoom,
  updateRoom,
  allocateRoomAdmin,
  vacateRoomAdmin,
  getAllStudentsSummary,
} = require("../controllers/adminController");
const { createHostel } = require("../controllers/hostelController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminDashboard
);

router.get("/hostels", authMiddleware, roleMiddleware("ADMIN"), getAllHostels);

router.get("/rooms", authMiddleware, roleMiddleware("ADMIN"), getAllRooms);

router.get(
  "/allocations",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllAllocations
);

router.post("/hostels", authMiddleware, roleMiddleware("ADMIN"), createHostel);
router.put(
  "/hostels/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateHostel
);
router.delete(
  "/hostels/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteHostel
);

router.post("/rooms", authMiddleware, roleMiddleware("ADMIN"), createRoom);
router.put("/rooms/:id", authMiddleware, roleMiddleware("ADMIN"), updateRoom);
router.delete(
  "/rooms/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteRoom
);

// Admin allocation management
router.post(
  "/allocations/allocate",
  authMiddleware,
  roleMiddleware("ADMIN"),
  allocateRoomAdmin
);

router.post(
  "/allocations/vacate",
  authMiddleware,
  roleMiddleware("ADMIN"),
  vacateRoomAdmin
);

// Admin student summaries
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllStudentsSummary
);

module.exports = router;
