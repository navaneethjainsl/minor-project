import React from "react";
import "./Sidebar.css";

import ContactPage from "./Contactpage";

const Contact = () => {
  return (
    <>
      <article className="about  active" data-page="about">
        <ContactPage />
      </article>
    </>
  );
};

export default Contact;
