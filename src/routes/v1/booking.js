const express = require('express');

const router = express.Router();

const { BookingController } = require('../../controllers/index');

router.post('/', BookingController.createBooking);
router.post('/payments', BookingController.createPayment);

module.exports = {
    bookingRoutes: router
}