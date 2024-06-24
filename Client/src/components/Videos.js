// Portfolio.js
import React from "react";
import "./Sidebar.css";
import Videospage from "./Videospage";

// Import the ProjectItem component

const Portfolio = () => {
  return (
    <article className="about  active" data-page="about">
      <Videospage />
    </article>
  );
};

export default Portfolio;
