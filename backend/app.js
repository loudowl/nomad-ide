const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Pool } = require('pg');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');
const routes = require('./src/routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const redis = new Redis(process.env.REDIS_URL);
const jwtSecret = process.env.JWT_SECRET;

// Middleware and routes
app.use(express.json());
app.use('/api', routes);

// WebSocket setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
