import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/newTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';

const App = () => {
  //console.log('env:', process.env.NODE_ENV);
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-ticket" element={<NewTicket />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/ticket/:ticketId" element={<Ticket />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
