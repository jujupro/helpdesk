import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-btns">
      <Link to="/new-ticket" className="btn btn-block">
        Create Ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        View Tickets
      </Link>
    </div>
  );
}

export default Home;
