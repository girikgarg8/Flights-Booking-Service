const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const { SuccessResponse, ErrorResponse } = require('../utils/common/index');

/**
 * POST : /bookings
 * req-body {name: 'Bengaluru', code: 'BLR', cityId:'1'} 
 */

async function createBooking(req, res) {
    try {
        console.log(req.body);
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
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    createBooking
}