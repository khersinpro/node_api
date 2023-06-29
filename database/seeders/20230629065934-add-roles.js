'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'ROLE_ADMIN',
        description: 'Administrateur du site' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ROLE_USER',
        description: 'Utilisateur du site',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', {[Op.or]: [
      { name: 'ROLE_ADMIN' },
      { name: 'ROLE_USER' }
    ]});
  }
};
