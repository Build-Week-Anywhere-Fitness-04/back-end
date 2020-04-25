const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => res.send('API running'));

// Define routes
server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/instructors', require('./routes/api/instructors'));
server.use('/api/clients', require('./routes/api/clients'));
server.use('/api/classes', require('./routes/api/classes'));

module.exports = server;