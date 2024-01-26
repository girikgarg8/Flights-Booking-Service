
**High level flow of the Booking Service**

The flow of this booking service is inspired by real life booking services like Flipkart Flights. When we initiate a booking like that on Flipkart Flights, it creates a temporary booking in the 'INITIATED' state. There's a timer of sometime (like 20 minutes or so), within which the payment must be done. If the payment service return a 200 (OK) response, then the booking service creates the required booking. Else if the session expires, then the booking transitions from 'INTIATED' state to 'TIMEDOUT' state.

Challenges which we can face in the booking service (and we are looking to resolve them):

1. Handling concurrent bookings
2. Handling cases when the payment service returns 200 but the booking is not done
3. Handling cases when the payment is done multiple times for the same booking