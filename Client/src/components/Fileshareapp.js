import React, { useState } from "react";
import axios from "axios";


const Fileshare = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleQuestionSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/question", { question });
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
        <h2 className="h2 article-title">Share files</h2>
      </header>
      
    </>
  );
};

export default Fileshare;
