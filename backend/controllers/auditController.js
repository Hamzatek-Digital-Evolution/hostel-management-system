const { AuditLog } = require("../models");

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch audit logs",
      error: error.message,
    });
  }
};
