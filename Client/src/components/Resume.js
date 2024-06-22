import React from "react";
import "./Sidebar.css";

import Resumepage from './Educationpage';

import Skills from './Skillspage';


function Resume() {
  return (
    <article className="about  active" data-page="about">
      
      <Resumepage />
      <Skills />

    </article>
  );
}

export default Resume;
