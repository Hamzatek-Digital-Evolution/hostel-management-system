const { Payment, Student, Hostel } = require("../models");
const logAction = require("../utils/auditLogger");
const generateReceipt = require("../utils/receiptGenerator");
const PDFDocument = require("pdfkit");
const { getCurrentSemester } = require("../utils/semesterUtils");

/* STUDENT: INITIATE PAYMENT */
exports.initiatePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount: providedAmount, reference, option, hostelId } = req.body;

    const student = await Student.findOne({ where: { userId } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // determine hostel fee
    let fee = null;
    if (hostelId) {
      const { Hostel } = require("../models");
      const hostel = await Hostel.findByPk(hostelId);
      if (!hostel) return res.status(404).json({ message: "Hostel not found" });
      // Enforce hostel gender
      if (hostel.gender !== student.gender) {
        return res.status(403).json({
          message:
            "You cannot pay for a hostel that does not match your gender",
        });
      }
      fee = Number(hostel.feeAmount || 0);
    } else {
      // try to use student's allocation hostel if available
      const { Allocation, Room, Hostel } = require("../models");
      const allocation = await Allocation.findOne({
        where: { studentId: student.id, status: "ACTIVE" },
        include: [{ model: Room, include: [Hostel] }],
      });
      if (allocation && allocation.Room && allocation.Room.Hostel) {
        fee = Number(allocation.Room.Hostel.feeAmount || 0);
      }
    }

    if (!fee) {
      return res
        .status(400)
        .json({ message: "Hostel fee not found. Choose a hostel to pay for." });
    }

    // validate option and compute expected amount
    const payOption = option === "FULL_YEAR" ? "FULL_YEAR" : "SEMESTER";
    const expectedAmount =
      payOption === "FULL_YEAR"
        ? Number((fee * 2).toFixed(2))
        : Number(fee.toFixed(2));

    // ignore providedAmount and set to expectedAmount for integrity
    const amount = expectedAmount;
    // determine semester from request or default to current
    const semester = req.body.semester || getCurrentSemester(); // e.g. SEM_1_2025

    // check existing pending payment
    const existingPending = await Payment.findOne({
      where: {
        studentId: student.id,
        hostelId,
        semester,
        status: "PENDING",
      },
    });

    if (existingPending) {
      return res.status(409).json({
        message:
          "You already have a pending payment for this hostel this semester",
      });
    }
    const payment = await Payment.create({
      studentId: student.id,
      amount,
      option: payOption,
      hostelId: hostelId || null,
      semester,
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

/* ADMIN: DELETE PAYMENT */
exports.deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findByPk(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await payment.destroy();

    // Audit log
    await logAction({
      userId: req.user.id,
      action: "PAYMENT_DELETED",
      entity: "Payment",
      entityId: paymentId,
      description: "Admin deleted a payment record",
    });

    return res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    console.error("Failed to delete payment:", error);
    return res.status(500).json({ message: "Failed to delete payment" });
  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findByPk(paymentId);
    if (!payment || payment.status !== "PAID") {
      return res.status(403).json({ message: "Receipt not available" });
    }

    const student = await Student.findByPk(payment.studentId);
    const hostel = await Hostel.findByPk(payment.hostelId);

    // Stream PDF directly to response to avoid writing to disk
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${payment.id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("HOSTEL PAYMENT RECEIPT", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
    doc.text(
      `Registration Number: ${student.regNumber || student.regNo || "N/A"}`
    );
    doc.text(`Hostel: ${hostel ? hostel.name : "N/A"}`);
    doc.text(`Semester: ${payment.semester}`);
    doc.text(`Amount Paid: KES ${payment.amount}`);
    doc.text(`Reference: ${payment.reference || "N/A"}`);
    doc.text(`Status: ${payment.status}`);
    doc.text(`Date: ${new Date(payment.updatedAt).toLocaleDateString()}`);

    doc.end();
  } catch (err) {
    return res.status(500).json({ message: "Failed to generate receipt" });
  }
};

exports.getStudentPaymentHistory = async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });

  const payments = await Payment.findAll({
    where: { studentId: student.id },
    order: [["createdAt", "DESC"]],
  });

  res.json(payments);
};

/*exports.downloadReceipt = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [Student, Hostel],
    });

    if (!payment || payment.status !== "PAID") {
      return res.status(403).json({ message: "Receipt not available" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${payment.id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(18).text("HOSTEL PAYMENT RECEIPT", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Receipt No: HMS-${payment.id}`);
    doc.text(`Student: ${payment.Student.fullName}`);
    doc.text(`Reg No: ${payment.Student.registrationNumber}`);
    doc.text(`Hostel: ${payment.Hostel.name}`);
    doc.text(`Semester: ${payment.semester}`);
    doc.text(`Amount Paid: KES ${payment.amount}`);
    doc.text(`Date: ${payment.updatedAt.toDateString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to generate receipt" });
  }
};*/
