const express = require("express");
const router = express.Router();
const allocationController = require("../controllers/allocationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/* STUDENT BOOK ROOM */
router.post(
  "/book",
  authMiddleware,
  roleMiddleware("STUDENT"),
  allocationController.bookRoom
);

/* STUDENT VACATE ROOM */
router.post(
  "/vacate",
  authMiddleware,
  roleMiddleware("STUDENT"),
  allocationController.vacateRoom
);

/* ADMIN: VIEW ALL ALLOCATIONS */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  allocationController.getAllAllocations
);

/* ADMIN: FILTER ALLOCATIONS */
router.get(
  "/filter",
  authMiddleware,
  roleMiddleware("ADMIN"),
  allocationController.filterAllocations
);

/* STUDENT: get own allocation status (includes latest payment) */
router.get(
  "/status/student",
  authMiddleware,
  roleMiddleware(["STUDENT", "ADMIN"]),
  allocationController.getStudentAllocationStatus
);

/* ADMIN: get allocation + payment by studentId (query param) */
router.get(
  "/status/payment",
  authMiddleware,
  roleMiddleware("ADMIN"),
  allocationController.getAllocationStatusByPayment
);

/* ADMIN: get all allocation statuses (each with latest payment) */
router.get(
  "/status/all",
  authMiddleware,
  roleMiddleware("ADMIN"),
  allocationController.getAllAllocationStatuses
);

module.exports = router;
