const Friend = require('../models/friend.model');
const User = require('../models/user.model'); // Ersetzen Sie den Pfad entsprechend

// Freundschaftsanfrage senden
const sendFriendRequest = async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user._id; // Annahme: Authentifizierter Benutzer

    try {
        if (userId === friendId) {
            return res.status(400).json({ message: 'Cannot add yourself as a friend' });
        }

        const existingRequest = await Friend.findOne({
            user: userId,
            friend: friendId
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent or friendship exists' });
        }

        const newRequest = new Friend({
            user: userId,
            friend: friendId,
            status: 'pending'
        });

        await newRequest.save();
        res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send friend request', error: error.message });
    }
};

// Freundschaftsanfrage akzeptieren
const acceptFriendRequest = async (req, res) => {
    const { requestId } = req.params;
    const userId = req.user._id; // Annahme: Authentifizierter Benutzer

    try {
        const request = await Friend.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        if (request.friend.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to accept this request' });
        }

        request.status = 'accepted';
        await request.save();

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to accept friend request', error: error.message });
    }
};

// Freundschaftsanfrage ablehnen
const rejectFriendRequest = async (req, res) => {
    const { requestId } = req.params;
    const userId = req.user._id; // Annahme: Authentifizierter Benutzer

    try {
        const request = await Friend.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        if (request.friend.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to reject this request' });
        }

        request.status = 'rejected';
        await request.save();

        res.status(200).json({ message: 'Friend request rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject friend request', error: error.message });
    }
};

// Freunde des Benutzers abrufen
const getFriends = async (req, res) => {
    const userId = req.user._id; // Annahme: Authentifizierter Benutzer

    try {
        const friends = await Friend.find({ user: userId, status: 'accepted' }).populate('friend');
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve friends', error: error.message });
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends
};
