const cron = require('node-cron');
const { BookingService } = require('../../services');

function scheduleCrons() {
    cron.schedule('*/30 * * * *' ,async () => {
        console.log('Running the cron job to clear old bookings');
        await BookingService.cancelOldBookings();
    });
}

module.exports = scheduleCrons;
