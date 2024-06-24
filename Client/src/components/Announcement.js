import React from "react";
import "./Sidebar.css";

import Announcementpage from "./Announcementpage";

import Skills from "./Skillspage";

function Announcement() {
  return (
    <article className="about  active" data-page="about">
      <Announcementpage />
      <Skills />
    </article>
  );
}

export default Announcement;
