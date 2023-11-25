import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Ticket() {
  const { ticket } = useSelector((state) => state.tickets);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get id from url
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(getTicket(ticketId));
  }, [ticketId, dispatch]);

  return (
    <div className="singleTicket">
      <h3>Ticket ID: {ticketId}</h3>
      <br />
      <br />
      {'='.repeat(35)}
      <h3>What is the problem?</h3>
      <p>{ticket.problem}</p>
      {'='.repeat(35)}
      <br />
      <h3>What did I expect to happen?</h3>
      <p>{ticket.expectation}</p>
      {'='.repeat(35)}
      <br />
      <h3>What have I already tried?</h3>
      <p>{ticket.tries}</p>
      {'='.repeat(35)}
      <br />
      <h3>Why I suspect it’s not working</h3>
      <p>{ticket.suspect}</p>
      {'='.repeat(35)}
    </div>
  );
}

export default Ticket;
