const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Hostel = sequelize.define(
  "Hostel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },

    totalRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "hostels",
    timestamps: true,
  }
);

module.exports = Hostel;
