const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.util');
const config = require('../config/app.config');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Create a new user
        const newUser = new User({ username, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.role);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
