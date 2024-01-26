const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models/index');

const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }
}

module.exports = BookingRepository;