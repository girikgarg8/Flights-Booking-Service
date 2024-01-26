const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models/index');

const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data,transaction){ // we are binding this function inside the same transaction object that we are passing as a parameter
        const response= await Booking.create(data,{transaction:transaction});
        return response;
    }
}

module.exports = BookingRepository;