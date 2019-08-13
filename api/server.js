const express = require('express');
const helmet = require('helmet');

const carsRouter = require('../routes/car-route.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>We&rsquo;re a go!</h2>`);
})

server.use('/api/cars', carsRouter);

module.exports = server;