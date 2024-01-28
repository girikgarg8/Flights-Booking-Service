const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SEARCH_SERVICE: process.env.FLIGHT_SEARCH_SERVICE,
    FLIGHT_API_GATEWAY: process.env.FLIGHT_API_GATEWAY
};