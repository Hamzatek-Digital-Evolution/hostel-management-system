const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // ✅ REQUIRED
    dialect: "mysql",
    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    retry: {
      max: 5,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };
