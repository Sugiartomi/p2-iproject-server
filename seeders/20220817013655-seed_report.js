'use strict';

let data = require('../data/reports.json')

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
     * 
    */
   data.forEach( e => {
    e.createdAt = new Date()
    e.updatedAt = new Date()
   })
   console.log(data);
   await queryInterface.bulkInsert("Reports", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reports", null, {});
  }
};
