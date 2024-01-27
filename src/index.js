const express = require('express');

const apiRoutes = require('./routes/index');

const { ServerConfig, Logger } = require('./config/index');

const CRONS = require('./utils/common/cron-jobs');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on port: ${ServerConfig.PORT}`);
    CRONS();
});