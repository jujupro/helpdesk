import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';
import { BsFillPatchQuestionFill } from 'react-icons/bs';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <BsFillPatchQuestionFill /> Help Desk
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/login">
            <IoMdLogIn /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaCircleUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
