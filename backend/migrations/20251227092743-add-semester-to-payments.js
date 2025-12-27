"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add semester column
    await queryInterface.addColumn("Payments", "semester", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "SEM_1_2025",
    });

    // 2. Add unique index for pending payments
    await queryInterface.addIndex(
      "Payments",
      ["studentId", "hostelId", "semester", "status"],
      {
        unique: true,
        name: "uniq_pending_payment_per_semester",
        where: {
          status: "PENDING",
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "Payments",
      "uniq_pending_payment_per_semester"
    );
    await queryInterface.removeColumn("Payments", "semester");
  },
};
