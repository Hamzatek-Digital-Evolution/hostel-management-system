const { sequelize } = require("../config/database");

const User = require("./User");
const Student = require("./Student");
const Hostel = require("./Hostel");
const Room = require("./Room");
const Allocation = require("./Allocation");
const Payment = require("./Payment");
const AuditLog = require("./AuditLog");

/* Associations (will be expanded later) */
User.hasOne(Student, { foreignKey: "userId" });
Student.belongsTo(User, { foreignKey: "userId" });

Hostel.hasMany(Room, { foreignKey: "hostelId" });
Room.belongsTo(Hostel, { foreignKey: "hostelId" });

Student.hasOne(Allocation, { foreignKey: "studentId" });
Allocation.belongsTo(Student, { foreignKey: "studentId" });

Room.hasMany(Allocation, { foreignKey: "roomId" });
Allocation.belongsTo(Room, { foreignKey: "roomId" });

Student.hasMany(Payment, { foreignKey: "studentId" });
Payment.belongsTo(Student, { foreignKey: "studentId" });

module.exports = {
  sequelize,
  User,
  Student,
  Hostel,
  Room,
  Allocation,
  Payment,
  AuditLog,
};
