'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Ingredients', [
      {
        name: 'Farine',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Levure',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Orge',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chocolat',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amande',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Raisin',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sel',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sucre',
        description: 'Ingredient Bio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ingredients', {[Op.or]: [
      { name: 'Farine' },
      { name: 'Levure' },
      { name: 'Orge' },
      { name: 'Chocolat' },
      { name: 'Amande' },
      { name: 'Raisin' },
      { name: 'Sel' },
      { name: 'Sucre' },
    ]});
  }
};
