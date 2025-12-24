const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const auditRoutes = require("./routes/auditRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* Global Middleware */
// Restrict CORS in production to the configured frontend URL
const corsOptions = {};
if (process.env.FRONTEND_URL) {
  corsOptions.origin = process.env.FRONTEND_URL;
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Health Check */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Hostel Management System API is running",
  });
});

/* Routes */
app.use("/api/student", studentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/audit-logs", auditRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
