// chat_server.js
// Usage: node chat_server.js
const net = require('net');

const PORT = 8080;
let nextId = 1;
const clients = new Map(); // id -> socket

const server = net.createServer((socket) => {
  const id = nextId++;
  clients.set(id, socket);

  socket.setEncoding('utf8');
  console.log(`Client #${id} connected from ${socket.remoteAddress}:${socket.remotePort}`);

  // Announce new client to others
  broadcast(`#${id} joined\n`, id);

  socket.on('data', (data) => {
    // Normalize newlines and split into lines to avoid partial message issues.
    // Broadcast each non-empty line.
    data.split(/\r?\n/).forEach(line => {
      if (!line) return;
      const msg = `#${id}: ${line}\n`;
      broadcast(msg, id);
      process.stdout.write(msg); // optional: server console log
    });
  });

  socket.on('end', () => {
    console.log(`Client #${id} disconnected`);
    clients.delete(id);
    broadcast(`#${id} left\n`);
  });

  socket.on('error', (err) => {
    console.error(`Client #${id} error:`, err.message);
  });
});

function broadcast(message, exceptId) {
  for (const [cid, sock] of clients.entries()) {
    if (cid === exceptId) continue;
    if (!sock.destroyed) sock.write(message);
  }
}

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(PORT, () => {
  console.log(`Chat server listening on 0.0.0.0:${PORT}`);
});