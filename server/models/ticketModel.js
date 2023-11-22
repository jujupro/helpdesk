const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    problem: {
      type: String,
      required: [true, 'What is the problem?'],
    },
    expectation: {
      type: String,
      required: [true, 'What did I expect to happen?'],
    },
    tries: {
      type: String,
      required: [true, 'What have I already tried?'],
    },
    suspect: {
      type: String,
      required: [true, "Why I suspect it's not working?"],
      enum: [
        'Knowledge: null',
        'Runtime error in my brain',
        'Infinite loop of cluelessness',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
