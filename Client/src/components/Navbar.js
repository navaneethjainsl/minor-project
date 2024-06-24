import "./Sidebar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  //     const [click, setClick] = useState(false);
  // //   const [button, setButton] = useState(true);

  //   const handleClick = () => setClick(!click);
  //   const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link active">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/videos" className="navbar-link">
            Videos
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/announcement" className="navbar-link">
            Announcement
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/qna" className="navbar-link">
            QNA
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
