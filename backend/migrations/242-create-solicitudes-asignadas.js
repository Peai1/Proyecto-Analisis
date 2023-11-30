'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SolicitudesDerivadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSolicitud: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Solicitudes', // Nombre de la tabla de usuarios
          key: 'id' // Clave primaria de la tabla de usuarios
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      idSupervisor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Nombre de la tabla de usuarios
          key: 'id' // Clave primaria de la tabla de usuarios
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SolicitudesDerivadas');
  }
};
