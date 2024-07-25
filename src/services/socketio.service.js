const socketIO = require('socket.io');
const http = require('http');
const config = require('../config/app.config');
const logger = require('../utils/winston.util');

let io;

const initializeSocketIO = (server) => {
    io = socketIO(server);

    // Für Person-to-Person-Chat
    io.on('connection', (socket) => {
        logger.info('A user connected:', socket.id);

        // Event für den Empfang von Nachrichten im Person-to-Person-Chat
        socket.on('private_message', (data) => {
            const { recipientId, message } = data;
            io.to(recipientId).emit('private_message', {
                senderId: socket.id,
                message
            });
        });

        // Event für das Beitreten eines Benutzers zu einem Raum (für Gruppen-Chats)
        socket.on('join_group', (groupId) => {
            socket.join(groupId);
            logger.info(`User ${socket.id} joined group ${groupId}`);
        });

        // Event für den Empfang von Nachrichten in einer Gruppe
        socket.on('group_message', (data) => {
            const { groupId, message } = data;
            io.to(groupId).emit('group_message', {
                senderId: socket.id,
                message
            });
        });

        // Event für das Verwalten von Aufgaben
        socket.on('task_update', (data) => {
            const { taskId, update } = data;
            io.emit('task_update', {
                taskId,
                update
            });
        });

        // Event für das Aktualisieren des Kalenders
        socket.on('calendar_event', (data) => {
            const { event } = data;
            io.emit('calendar_event', event);
        });

        // Verbindungsabbruch
        socket.on('disconnect', () => {
            logger.info('User disconnected:', socket.id);
        });
    });

    logger.info('Socket.IO server running.');
};

module.exports = {
    initializeSocketIO,
    io // Exportieren des io-Objekts
};
