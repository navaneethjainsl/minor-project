import "./Sidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/home" className="navbar-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/videos" className="navbar-link" activeClassName="active">
            Videos
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/announcement" className="navbar-link" activeClassName="active">
            Announcement
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/qna" className="navbar-link" activeClassName="active">
            QNA
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/contact" className="navbar-link" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
