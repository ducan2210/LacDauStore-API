import {Server} from 'socket.io';

let io: Server | null = null;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    socket.on('join', userId => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
}

// ✅ Luôn đảm bảo `io` không bị `null`
export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.io has not been initialized!');
  }
  return io;
}
