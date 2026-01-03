#!/usr/bin/env node

/**
 * Module dependencies.
 */
import dotenv from 'dotenv';
dotenv.config();

import app from '../app';
import debug from 'debug';
import http from 'http';
import { connectMongo } from './../utils/mongo';


const debugLog = debug('watchlist-service:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Connect to MongoDB and then listen on provided port.
 */

(async () => {
  try {
    await connectMongo();
    
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string | number): string | number | boolean {
  const portNum = parseInt(val as string, 10);

  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debugLog('Listening on ' + bind);
  console.log('Server running on ' + bind);
}
