'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common/index');

const { BOOKED, PENDING, CANCELLED, INITIATED } = Enums.BOOKING_STATUS;

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [BOOKED, PENDING, INITIATED, CANCELLED],
      defaultValue: INITIATED,
      allowNull: false
    },
    noOfSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    totalCost: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};