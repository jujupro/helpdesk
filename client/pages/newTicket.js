import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../features/tickets/ticketSlice';

function NewTicket() {
  const [problem, setProblem] = useState('');
  const [expectation, setExpectation] = useState('');
  const [tries, setTries] = useState('');
  const [suspect, setSuspect] = useState('Knowledge: null');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ problem, expectation, tries, suspect }))
      .unwrap()
      .then(() => {
        //if the promise returned by createTicket resolves successfully, navigate the user
        navigate('/tickets');
      });
  };

  return (
    <>
      <section className="heading">
        <h4>Create New Ticket</h4>
        <h6>All fields are required</h6>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="problem">What is the problem?</label>
            <textarea
              name="problem"
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="expectation">What did I expect to happen?</label>
            <textarea
              name="expectation"
              id="expectation"
              value={expectation}
              onChange={(e) => setExpectation(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="tries">What have I already tried?</label>
            <textarea
              name="tries"
              id="tries"
              value={tries}
              onChange={(e) => setTries(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="suspect">Why I suspect it's not working?</label>
            <select
              name="suspect"
              id="suspect"
              value={suspect}
              onChange={(e) => setSuspect(e.target.value)}
            >
              <option value="Knowledge: null">Knowledge: null</option>
              <option value="Runtime error in my brain">
                Runtime error in my brain
              </option>
              <option value="Infinite loop of cluelessness">
                Infinite loop of cluelessness
              </option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-reverse">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
