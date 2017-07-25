const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const bot = require('./routers/bot');
const getImage = require('./routers/cms');
const app = express();
const https = require('https');
const request = require('request');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());
app.use('/bot', bot);
app.use('/cms', getImage);




const PORT = 2000;
const server = app.listen(PORT, () => {
  console.log(`Server Jalan di port ${PORT}`);
});

module.exports= server;
