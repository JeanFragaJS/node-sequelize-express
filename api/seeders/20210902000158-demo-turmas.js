'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('turmas', [
        {
          data_inicio: "2020-02-01",
          docente_id: 6,
          nivel_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()				 
        },
        {
          data_inicio: "2020-02-01",
          docente_id: 5,
          nivel_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()			
        },
        {
          data_inicio: "2020-02-01",
          docente_id: 6,
          nivel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()			
          },
        {
          data_inicio: "2020-07-01",
          docente_id: 6,
          nivel_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()			
        }], {});
    
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('turmas', null, {})
  }
};
