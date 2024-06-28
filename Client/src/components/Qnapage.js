import React, { useState } from "react";
import axios from "axios";
import "./Qnapage.css";

const QnaPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleQuestionSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/question",{
        withCredentials: true,
      }, { question });
      setAnswer(res.data.answer);
      setQuestion("");
      setError("");
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setError("Error fetching the answer. Please try again.");
    }
  };

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
          style={{ height: "200px" }}
          placeholder="Enter your query here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button className="submit-button" onClick={handleQuestionSubmit}>
          Submit
        </button>
      </section>
      <section className="qna-list">
        {answer && (
          <div className="qna-item">
            <h3>Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default QnaPage;
