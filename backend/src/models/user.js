'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Um usuário pode ter várias reservas
      User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.senha;
      return values;
    }
  }

  User.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      hooks: {
        beforeCreate: async (user) => {
          if (user.senha) user.senha = await bcrypt.hash(user.senha, 10);
        },
        beforeUpdate: async (user) => {
          if (user.changed('senha')) user.senha = await bcrypt.hash(user.senha, 10);
        },
      },
    }
  );

  return User;
};
