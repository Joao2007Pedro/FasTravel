'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      // Um voo pode ter várias reservas
      Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
    }
  }

  Flight.init({
    origem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    chegada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flight',
    tableName: 'Flights'
  });

  return Flight;
};
