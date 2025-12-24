const { Payment, Student } = require("../models");
const logAction = require("../utils/auditLogger");

/* STUDENT: INITIATE PAYMENT */
exports.initiatePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, reference } = req.body;

    const student = await Student.findOne({ where: { userId } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payment = await Payment.create({
      studentId: student.id,
      amount,
      reference,
      status: "PENDING",
    });

    return res.status(201).json({
      message: "Payment initiated, awaiting confirmation",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to initiate payment",
      error: error.message,
    });
  }
};

/* ADMIN: CONFIRM PAYMENT */
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "PAID";
    await payment.save();
    await logAction({
      userId: req.user.id,
      action: "PAYMENT_CONFIRMED",
      entity: "Payment",
      entityId: payment.id,
      description: "Admin confirmed student payment",
    });

    return res.status(200).json({
      message: "Payment confirmed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to confirm payment",
      error: error.message,
    });
  }
};

// Admin get all payments/statement
exports.getAllAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Student,
          attributes: ["id", "regNumber"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};
