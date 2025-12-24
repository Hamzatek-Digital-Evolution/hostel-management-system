const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    hostelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    occupied: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM("AVAILABLE", "FULL"),
      defaultValue: "AVAILABLE",
    },
  },
  {
    tableName: "rooms",
    timestamps: true,
  }
);

module.exports = Room;
