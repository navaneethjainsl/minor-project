import React from "react";
import "./Sidebar.css";

import QuickNotes from "./QuickNotes";

const Quick = () => {
  return (
    <>
      <article className="about  active" data-page="about">
        <div>
          <QuickNotes />

        </div>
      </article>
    </>
  );
};

export default Quick;