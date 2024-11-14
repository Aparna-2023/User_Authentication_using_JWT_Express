"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert roles into the 'Roles' table
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove the roles from the 'Roles' table
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
