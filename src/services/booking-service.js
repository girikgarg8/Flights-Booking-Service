const axios = require('axios');
const { BookingRepository } = require('../repositories/index');
const { ServerConfig } = require('../config/index')
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

async function createBooking(data) {
    return new Promise((resolve, reject) => {
        const result = db.sequelize.transaction(async function bookingImpl(t) {

            const flight = await axios.get(`${ServerConfig.FLIGHT_SEARCH_SERVICE}/api/v1/flights/${data.flightId}`, { transaction: t });
            const flightData = flight.data.data;
            if (data.noOfSeats > flightData.totalSeats) {
                reject(new AppError('Not enough seats available', StatusCodes.BAD_REQUEST));
            }
            resolve(true);
        });
    })
}

module.exports = {
    createBooking
}