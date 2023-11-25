import { Link } from 'react-router-dom';
import React from 'react';

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.problem}</div>
      <Link to={`/ticket/${ticket._id}`}>View</Link>
    </div>
  );
}

export default TicketItem;
