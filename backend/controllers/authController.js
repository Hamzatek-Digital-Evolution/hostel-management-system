const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Student } = require("../models");
require("dotenv").config();

/* REGISTER STUDENT */
exports.registerStudent = async (req, res) => {
  try {
    const {
      email,
      password,
      regNumber,
      firstName,
      middleName,
      lastName,
      gender,
      phoneNumber,
      school,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role: "STUDENT",
    });

    await Student.create({
      userId: user.id,
      regNumber,
      firstName,
      middleName,
      lastName,
      gender,
      phoneNumber,
      school,
    });

    return res.status(201).json({
      message: "Student registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

/* LOGIN USER */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

// ADMIN REGISTER
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    return res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};