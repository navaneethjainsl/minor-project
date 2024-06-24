import React from "react";
import "./Sidebar.css";

import QnaPage from "./Qnapage";

const Contact = () => {
  return (
    <>
      <article className="about  active" data-page="about">
        <QnaPage />
      </article>
    </>
  );
};

export default Contact;
