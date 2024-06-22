// Portfolio.js
import React from 'react';
import './Sidebar.css';
import Portfoliopage from './Portfoliopage';

 // Import the ProjectItem component

const Portfolio = () => {
  return (
    <article className="about  active" data-page="about">
      
      <Portfoliopage />
      

    </article>
    
  );
};

export default Portfolio;
