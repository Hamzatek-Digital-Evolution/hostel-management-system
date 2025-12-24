const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Allocation = sequelize.define(
  "Allocation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "VACATED"),
      defaultValue: "ACTIVE",
    },

   
    allocatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    vacatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "allocations",
    timestamps: true,
  }
);

module.exports = Allocation;
