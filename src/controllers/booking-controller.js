const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const { SuccessResponse, ErrorResponse } = require('../utils/common/index');

const inMemoryDb = {};

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

async function makePayment(req, res) {
    try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if (!idempotencyKey) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Idempotency key missing' })
        }
        if (inMemoryDb[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Cannot retry a successful payment' })
        }
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        })
        inMemoryDb[idempotencyKey] = idempotencyKey;
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
    makePayment
}