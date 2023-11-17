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
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Nombre de la tabla de usuarios
          key: 'id' // Clave primaria de la tabla de usuarios
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      monto_solicitado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      plazo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cuota_uf: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      estado_solicitud: {
        type: Sequelize.ENUM,
        values: ['Aprobado', 'Rechazado', 'Pendiente'],
        defaultValue: 'Pendiente', // Opcional, establece un valor por defecto
        allowNull: false
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
