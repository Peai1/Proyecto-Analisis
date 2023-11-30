import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Solicitudes extends Sequelize.Model {};

Solicitudes.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idUsuario: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
  montoSolicitado: {
    type: Sequelize.DataTypes.DECIMAL(20, 2), 
    allowNull: false
  },
  plazo: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  cuotaUF: {
    type: Sequelize.DataTypes.DECIMAL(20, 2), 
    allowNull: false
  },
  totalUF: {
    type: Sequelize.DataTypes.DECIMAL(20, 2), 
    allowNull: false
  },
  cuotaCLP: {
    type: Sequelize.DataTypes.DECIMAL(20, 2), 
    allowNull: false
  },
  totalCLP: {
    type: Sequelize.DataTypes.DECIMAL(20, 2), 
    allowNull: false
  },
  estadoSolicitud: { 
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'Pendiente',
    allowNull: false
  },
  supervisorAsignado:{
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Solicitud',
  tableName: 'Solicitudes', // Nombre tabla en BD
  timestamps: true, 
});


export default Solicitudes;
