const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.util');
const ticketController = require('../controllers/ticket.controller');

// Create a new ticket
router.post('/', upload.array('attachments'), ticketController.createTicket);

// Get all tickets
router.get('/', ticketController.getAllTickets);

// Get a single ticket by ID
router.get('/:id', ticketController.getTicketById);

// Update a ticket by ID
router.put('/:id', upload.array('attachments'), ticketController.updateTicketById);

// Delete a ticket by ID
router.delete('/:id', ticketController.deleteTicketById);

module.exports = router;
