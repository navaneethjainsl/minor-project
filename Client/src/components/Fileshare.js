// Home.js
import React from "react";
import "./Sidebar.css";
// Import the BlogPostItem component
import Fileshare from "./Fileshareapp";

const File = () => {
  return (
    <article className="about  active" data-page="about">
      <Fileshare />
    </article>
  );
};

export default File;
