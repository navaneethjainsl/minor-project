// Home.js
import React from "react";
import "./Sidebar.css";
// Import the BlogPostItem component
import Fileshare from "./Fileshareapp";

const File = () => {
  return (
    <article className="about  active" data-page="about">
      <div>
        <Fileshare />

      </div>
    </article>
  );
};

export default File;
