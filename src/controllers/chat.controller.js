const Chat = require('../models/chat.model');
const { io } = require('../services/socketio.service');

// Funktion zum Senden einer Nachricht
const sendMessage = async (req, res) => {
    try {
        const { senderId, recipientId, groupId, message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const newMessage = new Chat({
            senderId,
            recipientId,
            groupId,
            message
        });

        const savedMessage = await newMessage.save();

        // Nachricht über Socket.IO senden
        if (recipientId) {
            io.to(recipientId).emit('private_message', {
                senderId,
                message
            });
        } else if (groupId) {
            io.to(groupId).emit('group_message', {
                senderId,
                message
            });
        } else {
            // Optional: Implementieren Sie eine Logik für Nachrichten ohne Empfänger oder Gruppe
        }

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Funktion zum Abrufen aller Nachrichten eines Benutzers
const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const messages = await Chat.find({
            $or: [
                { senderId: userId },
                { recipientId: userId },
                { groupId: { $exists: true } } // Alle Gruppennachrichten
            ]
        }).populate('senderId recipientId groupId');

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    sendMessage,
    getMessages
};
