const { Room, Hostel } = require("../models");

/* CREATE ROOM */
exports.createRoom = async (req, res) => {
  try {
    const { hostelId, roomNumber, capacity } = req.body;

    const hostel = await Hostel.findByPk(hostelId);
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    const room = await Room.create({
      hostelId,
      roomNumber,
      capacity,
    });

    return res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create room",
      error: error.message,
    });
  }
};

/* GET ROOMS (WITH AVAILABILITY) */
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [{ model: Hostel }],
    });

    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};
