import axios from 'axios';
const API_URL = '/api/tickets/';

//create new ticket
const createTicket = async (ticketData, token) => {
  //set header to get authorized
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

//get all user tickets
const getTickets = async (token) => {
  //set header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

//get one ticket
const getTicket = async (ticketId, token) => {
  //set header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
};

export default ticketService;
