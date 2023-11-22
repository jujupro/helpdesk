import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-btns">
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        Create New Ticket
      </Link>

      <Link to="/tickets" className="btn btn-reverse btn-block">
        View Tickets
      </Link>
    </div>
  );
}

export default Home;
