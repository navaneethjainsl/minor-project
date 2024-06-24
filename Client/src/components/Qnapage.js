import React from "react";

function QnaPage() {
  return (
    <>
      <header>
        <h2 className="h2 article-title">Quora</h2>
      </header>
      <section className="mapbox" data-mapbox>
        <textarea
          name="input"
          id="input"
          cols="100"
          rows="10"
          style={{height:'379px'}}
          placeholder="Enter your query here"
        ></textarea>
      </section>
    </>
  );
}

export default QnaPage;
