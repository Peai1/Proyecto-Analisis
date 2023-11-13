import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class User extends Sequelize.Model {};

User.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Agrego tipo
  tipo: {
    type: Sequelize.DataTypes.ENUM('Cliente', 'Analista Comercial', 'Analista Ventas', 'Supervisor'),
    allowNull: false // o false si quieres que sea un campo obligatorio
  },
  nombre: Sequelize.DataTypes.STRING,
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false
  }}, {
    sequelize,
    timestamps: true,
  }
);

export default User;
