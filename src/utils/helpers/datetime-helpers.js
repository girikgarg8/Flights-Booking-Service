function compareTime(flightarrivalTime, flightdepartureTime) {
    const arrivalTime = new Date(flightarrivalTime);
    const departureTime = new Date(flightdepartureTime);
    return arrivalTime > departureTime;
}

module.exports = {
    compareTime
}