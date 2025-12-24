const { Hostel, Room } = require("../models");
const { Op, literal } = require("sequelize");

/* CREATE HOSTEL */
exports.createHostel = async (req, res) => {
  try {
    const { name, gender, totalRooms } = req.body;

    const hostel = await Hostel.create({
      name,
      gender,
      totalRooms,
    });

    return res.status(201).json({
      message: "Hostel created successfully",
      hostel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create hostel",
      error: error.message,
    });
  }
};

/* GET ALL HOSTELS */
exports.getHostels = async (req, res) => {
  try {
    const { gender } = req.query;
    const where = {};
    if (gender) where.gender = gender;

    const hostels = await Hostel.findAll({ where });
    return res.status(200).json(hostels);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch hostels",
      error: error.message,
    });
  }
};

/* GET ROOMS FOR A HOSTEL (optionally only available rooms) */
exports.getHostelRooms = async (req, res) => {
  try {
    const { hostelId } = req.params;
    const { available } = req.query; // ?available=true

    const hostel = await Hostel.findByPk(hostelId);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });

    const where = { hostelId };
    if (available && available.toString() === "true") {
      // DB-level availability: occupied < capacity
      where[Op.and] = literal("occupied < capacity");
    }

    const rooms = await Room.findAll({ where, include: [{ model: Hostel }] });

    return res.status(200).json(rooms);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch hostel rooms", error: error.message });
  }
};
