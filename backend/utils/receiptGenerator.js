const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = async function generateReceipt(payment, student, hostel) {
  const dir = path.join(__dirname, "..", "uploads", "receipts");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const fileName = `receipt_${payment.id}.pdf`;
  const filePath = path.join(dir, fileName);
  //

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("HOSTEL PAYMENT RECEIPT", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Student Name: ${student.firstName} ${student.lastName}`);
  doc.text(`Registration Number: ${student.regNumber}`);
  doc.text(`Hostel: ${hostel.name}`);
  doc.text(`Semester: ${payment.semester}`);
  doc.text(`Amount Paid: KES ${payment.amount}`);
  doc.text(`Reference: ${payment.reference || "N/A"}`);
  doc.text(`Status: ${payment.status}`);
  doc.text(`Date: ${new Date(payment.updatedAt).toLocaleDateString()}`);

  doc.end();

  return { filePath, fileName };
};
