import React from "react";
import "./Sidebar.css";

import ContactPage from "./Contactpage";

const Contact = () => {
  return (
    <>
      <article className="about  active" data-page="about">
        <div>
          <ContactPage />

        </div>
      </article>
    </>
  );
};

export default Contact;
