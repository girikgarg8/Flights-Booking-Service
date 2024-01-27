const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');
const AppError = require('../utils/errors/app-error');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) { // we are binding this function inside the same transaction object that we are passing as a parameter
        const response = await Booking.create(data, { transaction: transaction });
        return response;
    }
    async getBooking(data, transaction) {
        const response = await Booking.findByPk(data);
        if (!response) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async updateBooking(id, data, transaction) {
        const response = await Booking.update(data, {
            where: {
                id: id
            }
        }, { transaction: transaction });
        return response;
    }
}

module.exports = BookingRepository;