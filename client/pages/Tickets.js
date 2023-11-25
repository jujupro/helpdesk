import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets } from '../features/tickets/ticketSlice';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { tickets } = useSelector((state) => state.tickets);
  // console.log(tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <>
      <h1 className="tickets-title">Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Problem</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
