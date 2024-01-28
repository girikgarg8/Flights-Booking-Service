const amqplib = require('amqplib');

let channel, connection;

async function connectQueue() {
    try {
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("Notification-Queue");
    }
    catch (error) {
        throw error;
    }
}

async function sendData(data) {
    try {
        await channel.sendToQueue("Notification-Queue", Buffer.from(JSON.stringify(data)));
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    connectQueue,
    sendData
}