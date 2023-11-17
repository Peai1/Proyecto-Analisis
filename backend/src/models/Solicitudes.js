import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class Solicitudes extends Sequelize.Model {};

Solicitudes.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', 
      key: 'id',
    },
  },
  monto_solicitado: {
    type: Sequelize.DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  plazo: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  cuota_uf: {
    type: Sequelize.DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  total: {
    type: Sequelize.DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  estado_solicitud: { 
    type: Sequelize.DataTypes.ENUM('Aprobado', 'Rechazado', 'Pendiente'),
    defaultValue: 'Pendiente',
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Solicitud',
  tableName: 'Solicitudes', // Nombre tabla en BD
  timestamps: true, 
});


export default Solicitudes;
