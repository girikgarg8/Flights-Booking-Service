const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const { SuccessResponse, ErrorResponse } = require('../utils/common/index');

/**
 * POST : /bookings
 * req-body {name: 'Bengaluru', code: 'BLR', cityId:'1'} 
 */

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        })
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/**
 * POST : /payments
 * req-body {totalCost:17000,userId:1,bookingId:2} 
 */

async function createPayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        })
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    createPayment
}