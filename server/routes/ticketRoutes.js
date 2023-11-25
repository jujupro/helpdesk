const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect } = require('../controllers/auth');

router.get('/:id', protect, ticketController.getTicket);
router.get('/', protect, ticketController.getTickets);
router.post('/', protect, ticketController.createTicket);

module.exports = router;
