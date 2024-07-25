const Ticket = require('../models/ticket.model');

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const { title, description, status, priority, assignedTo } = req.body;
        const attachments = req.files ? req.files.map(file => file.path) : [];

        const ticket = new Ticket({ title, description, status, priority, createdBy: req.user._id, assignedTo, attachments });
        await ticket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
    }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('createdBy assignedTo');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('createdBy assignedTo');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket', error });
    }
};

// Update a ticket by ID
exports.updateTicketById = async (req, res) => {
    try {
        const { title, description, status, priority, assignedTo } = req.body;
        const attachments = req.files ? req.files.map(file => file.path) : [];

        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, assignedTo, attachments, updatedAt: new Date() },
            { new: true }
        ).populate('createdBy assignedTo');

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket updated successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};

// Delete a ticket by ID
exports.deleteTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};
