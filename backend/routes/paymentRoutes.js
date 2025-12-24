const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/* STUDENT: INITIATE PAYMENT */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("STUDENT"),
  paymentController.initiatePayment
);

/* ADMIN: CONFIRM PAYMENT */
router.put(
  "/:paymentId/confirm",
  authMiddleware,
  roleMiddleware("ADMIN"),
  paymentController.confirmPayment
);

/* STUDENT: INITIATE PAYMENT */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["STUDENT", "ADMIN"]),
  paymentController.getAllAllPayments
);

module.exports = router;
