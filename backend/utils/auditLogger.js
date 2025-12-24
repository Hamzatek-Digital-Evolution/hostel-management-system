const { AuditLog } = require('../models');

const logAction = async ({
  userId,
  action,
  entity,
  entityId,
  description
}) => {
  try {
    await AuditLog.create({
      userId,
      action,
      entity,
      entityId,
      description
    });
  } catch (error) {
    console.error('Audit log failed:', error.message);
  }
};

module.exports = logAction;
