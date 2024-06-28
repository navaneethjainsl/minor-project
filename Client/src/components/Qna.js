import React from "react";
import "./Sidebar.css";

import QnaPage from "./Qnapage";

const Qna = () => {
  return (
    <>
      <article className="about  active" data-page="about">
        <div>
          <QnaPage />

        </div>
      </article>
    </>
  );
};

export default Qna;
