
import './Sidebar.css';
import React ,{useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
//     const [click, setClick] = useState(false);
// //   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

  return (

    
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link active" >About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/resume" className="navbar-link" >Resume</Link>
        </li>
        <li className="navbar-item">
          <Link to="/portfolio" className="navbar-link"  >Portfolio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/blog" className="navbar-link" >Blog</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link" >Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

