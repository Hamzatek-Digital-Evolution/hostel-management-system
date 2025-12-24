require("dotenv").config();
const app = require("./app");
const { connectDB, sequelize } = require("./config/database");
require("./models"); // Load all models & associations

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    /* Controlled sync */
    await sequelize.sync({ alter: false });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
