// chat_client.js
// Usage: node chat_client.js [host] [port]
// Default host=localhost port=8080
const net = require('net');
const readline = require('readline');

const host = process.argv[2] || 'localhost';
const port = Number(process.argv[3] || 8080);

const socket = net.connect({ host, port }, () => {
  console.log(`Connected to ${host}:${port}`);
  rl.prompt();
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
  // print incoming messages
  process.stdout.write(data);
});

socket.on('end', () => {
  console.log('\nDisconnected from server');
  process.exit(0);
});

socket.on('error', (err) => {
  console.error('Connection error:', err.message);
  process.exit(1);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

// Read lines from stdin and send to socket
rl.on('line', (line) => {
  if (line === '/quit') {
    socket.end();
    rl.close();
    return;
  }
  // Ensure newline so server can split lines
  socket.write(line + '\n');
});

rl.on('SIGINT', () => {
  socket.end();
  rl.close();
});