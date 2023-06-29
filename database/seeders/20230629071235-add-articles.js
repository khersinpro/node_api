'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        name: 'Pain au chocolat',
        description: 'Pain au chocolat maison bio' ,
        price: 0.85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Croissant',
        description: 'Croissant maison bio',
        price: 0.65,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        name: 'Tarte aux pommes',
        description: 'Tarte aux pommes maison bio',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        name: 'Fondant au chocolat',
        description: 'Fondant au chocolat maison bio',
        price: 8.99,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        name: 'Chausson aux pommes',
        description: 'Chausson aux pommes maison bio',
        price: 1.20,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        name: 'Cookie',
        description: 'Cookie maison bio',
        price: 1.85,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', {[Op.or]: [
      {
        name: 'Pain au chocolat',
      },
      {
        name: 'Croissant',     
      },
      {
        name: 'Tarte aux pommes',       
      },
      {
        name: 'Fondant au chocolat',    
      },
      {
        name: 'Chausson aux pommes',       
      },
      {
        name: 'Cookie',  
      },
    ]});
  }
};
