const express = require('express');

const { PORT } = require('./config/index');

const apiRoutes = require('./routes/index');

const { ServerConfig, Logger } = require('./config/index');

const app = express();

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on port: ${ServerConfig.PORT}`);
});