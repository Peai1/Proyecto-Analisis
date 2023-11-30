'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Nombre de la tabla de usuarios
          key: 'id' // Clave primaria de la tabla de usuarios
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      montoSolicitado: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false
      },
      plazo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cuotaUF: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false
      },
      totalUF: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false
      },
      cuotaCLP: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false
      },
      totalCLP: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false
      },
      estadoSolicitud: {
        type: Sequelize.STRING,
        defaultValue: 'Pendiente', // Opcional, establece un valor por defecto
        allowNull: false
      },
      supervisorAsignado:{
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Solicitudes');
  }
};
