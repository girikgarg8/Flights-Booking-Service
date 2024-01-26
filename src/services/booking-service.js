const axios = require('axios');
const { BookingRepository } = require('../repositories/index');
const { ServerConfig } = require('../config/index')
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const bookingRepository= new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SEARCH_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if (data.noOfSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = { ...data, totalCost: totalBillingAmount };

        //create the booking in the bookings table
        const booking = await bookingRepository.create(bookingPayload, transaction); // we want to bind the create function of Booking Repository too with the same transaction object that we are using here
        
        //Temporarily hold the seats for the user until a few minutes, by reducing the number of seats in the Flights table
     
        await axios.patch(`${ServerConfig.FLIGHT_SEARCH_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        })
        await transaction.commit();
        return booking;
    }
    catch (error) {
        //If anything goes sideways in the above try block (like the required number of seats not being available, creating the booking in the bokings table or updating the seats in the flight), then it is going to caught in the catch block. And the transaction is going to be rolled back.
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    createBooking
}