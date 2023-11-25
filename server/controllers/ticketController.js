const Ticket = require('../models/ticketModel');

const ticketController = {};

// no need to get the user, we already have them on res.locals object from protect middleware. The protect middleware already checks for valid user.

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
ticketController.getTickets = async (req, res, next) => {
  if (!res.locals.user) {
    return next({
      log: 'Not authorized',
      status: 401,
      message: { err: 'Not authorized' },
    });
  }

  const tickets = await Ticket.find({ user: res.locals.user.id });
  res.status(200).json(tickets);
};

// @desc    Get one ticket
// @route   GET /api/tickets/:id
// @access  Private
ticketController.getTicket = async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!res.locals.user) {
    return next({
      log: 'Not authorized',
      status: 401,
      message: { err: 'Not authorized' },
    });
  }

  if (!ticket) {
    return next({
      log: 'Ticket not found',
      status: 404,
      message: { err: 'Ticket not found' },
    });
  }

  if (ticket.user.toString() !== res.locals.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
};

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
ticketController.createTicket = async (req, res, next) => {
  const { problem, expectation, tries, suspect } = req.body;

  if (!problem || !expectation || !tries || !suspect) {
    return next({
      log: 'All fields are required',
      status: 400,
      message: { err: 'All fields are required' },
    });
  }

  if (!res.locals.user) {
    return next({
      log: 'Not authorized',
      status: 401,
      message: { err: 'Not authorized' },
    });
  }

  const ticket = await Ticket.create({
    problem,
    expectation,
    tries,
    suspect,
    user: res.locals.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
};

module.exports = ticketController;
