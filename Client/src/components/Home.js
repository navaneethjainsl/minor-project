// Home.js
import React from "react";
import "./Sidebar.css";
// Import the BlogPostItem component
import Homepage from "./Homepage";

const Home = () => {
  return (
    <article className="about  active" data-page="about">
      <Homepage />
    </article>
  );
};

export default Home;
