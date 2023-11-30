import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class SolicitudesDerivadas extends Sequelize.Model {};

SolicitudesDerivadas.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idSolicitud: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Solicitudes', 
      key: 'id',
    },
  },
  idSupervisor: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'SolicitudesDerivadas',
  tableName: 'SolicitudesDerivadas', // Nombre tabla en BD
  timestamps: true, 
});


export default SolicitudesDerivadas;
